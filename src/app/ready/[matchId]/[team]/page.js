"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./ready.module.css";

const MatchReady = ({ params }) => {
  const { matchId, team } = params;
  const [ready, setReady] = useState(false);
  const [ws, setWs] = useState(null);

  const [teamName, setTeamName] = useState({});
  const [playerName, setPlayerName] = useState({});
  const searchParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    const teamNames = searchParams.get("teamName");
    const playerNames = searchParams.get("playerName");

    if (teamNames) {
      try {
        setTeamName(JSON.parse(teamNames));
      } catch (error) {
        console.error("Error parsing teamName", error);
      }
    }
    if (playerNames) {
      try {
        setPlayerName(JSON.parse(playerNames));
      } catch (error) {
        console.error("Error parsing playerName", error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const query = new URLSearchParams({
      teamName: JSON.stringify(teamName),
      playerName: JSON.stringify(playerName),
    });

    if (matchId && team) {
      const socket = new WebSocket("ws://localhost:8080");

      socket.onopen = () => {
        socket.send(JSON.stringify({ type: "join", matchId, team }));
      };

      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.type === "start" && data.matchId === matchId) {
          router.push(`/ban-pick/match/${matchId}/${team}?${query}`);
        } else if (data.type === "disconnected") {
          alert(
            `${
              data.team === "blue" ? "블루팀" : "레드팀"
            } 플레이어가 연결을 끊었습니다.`
          );
        }
      };

      setWs(socket);

      return () => {
        socket.close();
      };
    }
  }, [matchId, team, router, teamName, playerName]);

  const handleReady = () => {
    if (ws) {
      ws.send(JSON.stringify({ type: "ready", matchId, team }));
      setReady(true);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main>
        <div className={style.container}>
          <h1>{team === "blue" ? "블루팀" : "레드팀"} READY PAGE</h1>
          <div className={style.ads}>
            <p>Google Ads</p>
          </div>
          <div className={style.info}>
            <h3>
              준비 버튼을 클릭후 {team === "blue" ? "레드팀" : "블루팀"} 을
              기다려주세요.
            </h3>
            <p>{team === "blue" ? "레드팀" : "블루팀"} 을 기다리고 있습니다.</p>
            <p>
              {team === "blue" ? "레드팀" : "블루팀"} 이 준비 버튼 클릭시 바로
              시작합니다.
            </p>
          </div>
          <button onClick={handleReady} disabled={ready}>
            {ready ? "준비 완료" : "준비"}
          </button>
        </div>
      </main>
    </Suspense>
  );
};

export default MatchReady;
