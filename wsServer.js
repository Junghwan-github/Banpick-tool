const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');  // uuid 라이브러리 import

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const matches = {};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'create') {
      const matchId = uuidv4();
      matches[matchId] = { blue: null, red: null, blueReady: false, redReady: false };
      ws.send(JSON.stringify({ type: 'created', matchId }));
    } else if (data.type === 'join') {
      const { matchId, team } = data;
      if (matches[matchId]) {
        ws.matchId = matchId;
        ws.team = team;
        matches[matchId][team] = ws;
        ws.send(JSON.stringify({ type: 'joined', matchId, team }));
      }
    }else if (data.type === 'ready') {
      const { matchId, team } = data;
      if (matches[matchId]) {
        matches[matchId][`${team}Ready`] = true;  // 팀의 준비 상태를 true로 설정합니다.
    
        if (matches[matchId].blueReady && matches[matchId].redReady) {  // 두 팀 모두 준비된 경우
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client.matchId === matchId) {
              client.send(JSON.stringify({ type: 'start', matchId }));
            }
          });
        }
      }
    } else if (data.type === 'select') {
      const { matchId, champData, team } = data;
      if (matches[matchId]) {
        const opponentTeam = team === 'blue' ? 'red' : 'blue';
        if (matches[matchId][opponentTeam]) {
          matches[matchId][opponentTeam].send(JSON.stringify({ type: 'select', champData, team }));
        }
      }
    }
  });

  ws.on('close', () => {
    const { matchId, team } = ws;
    if (matchId && matches[matchId]) {
      matches[matchId][team] = null;
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client.matchId === matchId) {
          client.send(JSON.stringify({ type: 'disconnected', team }));
        }
      });
    }
  });
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
