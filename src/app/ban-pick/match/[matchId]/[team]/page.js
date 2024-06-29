"use client";
import style from "./ban-pick.module.css";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../../../../components/header/header";
import Body from "../../../../components/body/body";

const BanPick = ({ params }) => {
  const { matchId, team } = params;
  const [ws, setWs] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isTeamName, setIsTeamName] = useState({});
  const [isPlayerName, setIsPlayerName] = useState({});
  const [champData, setChampData] = useState([]);
  const [champPickData, setChampPickData] = useState({
    name: "",
    id: "",
    bgImage: "",
    bgPosition: "",
  });
  const [selectedChampIndex, setSelectedChampIndex] = useState(null);
  const [isChampSelect, setIsChampSelect] = useState([]);
  const [pickTime, setPickTime] = useState(27);
  const [isTimerActive, setIsTimerActive] = useState(false);



  useEffect(() => {
    if (matchId) {
      const socket = new WebSocket("ws://localhost:8080");
  
      socket.onopen = () => {
        console.log("WebSocket connection established");
        socket.send(JSON.stringify({ type: "join", matchId, team }));
      };
  
      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
  
        if (data.type === "disconnected") {
          alert(
            `${
              data.team === "blue" ? "블루팀" : "레드팀"
            } 플레이어가 연결을 끊었습니다.`
          );
          router.push("/");
        } else if (data.type === "joined") {
          setIsTimerActive(true);
        } else if (data.type === "select") {
          // 서버로부터 데이터를 받아 처리
          setIsChampSelect((prevIsChampSelect) => {
            if (!prevIsChampSelect.some((champ) => champ.id === data.champData.id)) {
              return [...prevIsChampSelect, data.champData];
            }
            return prevIsChampSelect;
          });
  
          // 타이머를 재설정
          setPickTime(27);
        }
        console.log('Message from server:', data);
      };
  
      setWs(socket);
  
      return () => {
        socket.close();
      };
    }
  }, [matchId, router, team]);
  
  useEffect(() => {
    let interval = null;
  
    if (isTimerActive && pickTime > 0) {
      interval = setInterval(() => {
        setPickTime((prevPickTime) => prevPickTime - 1);
      }, 1000);
    } else if (pickTime === 0) {
      clearInterval(interval);
  
      const isChampSelectBlueIndex = [0, 2, 4, 6, 9, 10, 13, 15, 17, 18];
      const isBlueTurn = isChampSelectBlueIndex.includes(isChampSelect.length);
  
      if ((isBlueTurn && team === 'blue') || (!isBlueTurn && team === 'red')) {
        let randomChamp;
        do {
          const randomIndex = Math.floor(Math.random() * champData.length);
          randomChamp = champData[randomIndex];
        } while (
          isChampSelect.some((champ) => champ.id === randomChamp.id)
        );
  
        const bgImage = `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/sprite/${randomChamp.image.sprite}`;
  
        const newChampPickData = {
          name: randomChamp.name,
          id: randomChamp.id,
          bgImage: bgImage,
          bgPosition: `-${randomChamp.image.x}px -${randomChamp.image.y}px`,
        };
  
        // 챔피언 선택을 서버로 전송
        if (ws) {
          ws.send(
            JSON.stringify({
              type: "select",
              matchId,
              champData: newChampPickData,
              team,
            })
          );
        }
        setPickTime(27);
        return setIsChampSelect([...isChampSelect, newChampPickData]);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerActive, pickTime, champData, ws, matchId, team, isChampSelect]);



  useEffect(() => {
    const teamNames = searchParams.get("teamName");
    const playerNames = searchParams.get("playerName");
    if (teamNames) {
      try {
        setIsTeamName(JSON.parse(teamNames));
      } catch (error) {
        console.error("Error parsing teamNames", error);
      }
    }
    if (playerNames) {
      try {
        setIsPlayerName(JSON.parse(playerNames));
      } catch (error) {
        console.error("Error parsing playerNames", error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/14.12.1/data/ko_KR/champion.json"
      );
      let data = await res.json();

      let champDataArr = Object.keys(data.data).map((key) => {
        const champ = data.data[key];
        return {
          name: champ.name,
          id: champ.id,
          image: {
            full: champ.image.full,
            sprite: champ.image.sprite,
            x: champ.image.x,
            y: champ.image.y,
            w: champ.image.w,
            h: champ.image.h,
          },
          grayscale: false,
        };
      });

      setChampData(champDataArr);
    };
    fetchData();
  }, []);

  const handleChampClick = (e, index) => {
    const clickChamp = e.currentTarget;
    const computedStyle = window.getComputedStyle(clickChamp);
    const bgImage = computedStyle.backgroundImage;
    const bgPosition = computedStyle.backgroundPosition;
    const dataAttr = clickChamp.getAttribute("data-name");
    const dataAttrId = clickChamp.getAttribute("data-id");

    let bgImageUrl = "";
    if (bgImage) {
      const urlMatch = bgImage.match(/url\(["']?([^"']*)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        bgImageUrl = urlMatch[1];
      }
    }

    setChampPickData({
      name: dataAttr,
      id: dataAttrId,
      bgImage: bgImageUrl,
      bgPosition: bgPosition,
    });

    setSelectedChampIndex(index);

    setChampData((prevData) =>
      prevData.map((champ, i) =>
        i === index
          ? { ...champ, grayscale: true }
          : { ...champ, grayscale: false }
      )
    );
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsChampSelect((prevIsChampSelect) => {
      if (prevIsChampSelect.some((champ) => champ.id === champPickData.id)) {
        return prevIsChampSelect;
      }
      if (prevIsChampSelect.length >= 20) {
        setPickTime(0);
        return prevIsChampSelect;
      }
  
      const isChampSelectBlueIndex = [0, 2, 4, 6, 9, 10, 13, 15, 17, 18];
      const isBlueTurn = isChampSelectBlueIndex.includes(prevIsChampSelect.length);
      if ((isBlueTurn && team !== 'blue') || (!isBlueTurn && team !== 'red')) {
        // 현재 턴이 상대팀인 경우 선택 방지
        return prevIsChampSelect;
      }
  
      setPickTime(27);
      const updatedChampSelect = [...prevIsChampSelect, champPickData];
      
      // 챔피언 선택을 서버로 전송
      if (ws) {
        ws.send(JSON.stringify({
          type: 'select',
          matchId,
          champData: champPickData,
          team
        }));
      }
      
      return updatedChampSelect;
    });
  };


  console.log(isChampSelect);


  useEffect(() => {
    setChampData((prevData) =>
      prevData.map((champ) => ({
        ...champ,
        grayscale: isChampSelect.some((selected) => selected.id === champ.id),
      }))
    );
  }, [isChampSelect]);

  const handleChampSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setIsChampSearch(value);
  };

  const [isChampSearch, setIsChampSearch] = useState("");
  const isChampSelectBlueIndex = [0, 2, 4, 6, 9, 10, 13, 15, 17, 18];
  const isChampSelectRedIndex = [1, 3, 5, 7, 8, 11, 12, 14, 16, 19];

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <main className={style.main}>
      <div className={style.container}>
        <Header
          isTeamName={isTeamName}
          isChampSelect={isChampSelect}
          pickTime={pickTime}
          isChampSelectBlueIndex={isChampSelectBlueIndex}
          isChampSelectRedIndex={isChampSelectRedIndex}
        />
        <Body
          champData={champData}
          onChampListClick={handleChampClick}
          onChampSelectClick={handleButtonClick}
          isChampSelect={isChampSelect}
          champSearch={handleChampSearch}
          isChampSearch={isChampSearch}
          setIsChampSearch={setIsChampSearch}
          isPlayerName={isPlayerName}
        />
      </div>
    </main>
  </Suspense>
  );
};

export default BanPick;
