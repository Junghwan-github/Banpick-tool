const express = require('express');
const next = require('next');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIo(httpServer);


  io.on('connection', (socket) => {
    console.log('클라이언트 접속', socket.id);

    // socket.on('test', () => {
    //   const roomId = uuidv4();
    //   socket.join(roomId);
    //   socket.emit('roomId', roomId);
    // });

    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제');
    })
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
