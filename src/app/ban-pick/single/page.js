/* eslint-disable @next/next/no-img-element */
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import style from "./ban-pick.module.css";
import Header from "../../components/header/header";
import Body from "../../components/body/body";
import Modal from "../../components/modal/modal";

const BanPick = () => {
  // Team Name
  const params = useSearchParams();
  const [isTeamName, setIsTeamName] = useState({});
  const [isPlayerName, setIsPlayerName] = useState({});

  useEffect(() => {
    const teamNames = params.get("teamName");
    const playerNames = params.get("playerName");
    console.log(teamNames);
    console.log(playerNames);
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
  }, [params]);

  // Modal
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    // 모달 닫기 면서 타이머 시작
    setIsTimerActive(true);
  };

  // Champ API
  const [champData, setChampData] = useState([]);

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

  // Champ BanPick
  const [champPickData, setChampPickData] = useState({
    name: "",
    id: "",
    bgImage: "",
    bgPosition: "",
  });

  const [selectedChampIndex, setSelectedChampIndex] = useState(null);

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

  // Champ SelectButton
  const [isChampSelect, setIsChampSelect] = useState([]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsChampSelect((prevIsChampSelect) => {
      // 중복된 챔피언이 있는지 확인
      if (prevIsChampSelect.some((champ) => champ.id === champPickData.id)) {
        return prevIsChampSelect; // 중복된 챔피언이 있다면 추가하지 않음
      }

      if (prevIsChampSelect.length >= 20) {
        return prevIsChampSelect; // 20개가 넘으면 추가하지 않음
      }

      setPickTime(27);
      return [...prevIsChampSelect, champPickData];
    });
  };

  useEffect(() => {
    if (isChampSelect.length >= 20) {
      setPickTime(0);
    }
  }, [isChampSelect]);

  const [pickTime, setPickTime] = useState(27);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isTimerActive && pickTime > 0) {
      interval = setInterval(() => {
        setPickTime((prevPickTime) => prevPickTime - 1);
      }, 1000);
    } else if (pickTime === 0) {
      clearInterval(interval);

      // 랜덤 챔피언 선택
      setIsChampSelect((prevIsChampSelect) => {
        if (prevIsChampSelect.length >= 20 || champData.length === 0) {
          return prevIsChampSelect; // 20개가 넘으면 추가하지 않음
        }

        // 중복되지 않은 랜덤 챔피언 선택
        let randomChamp;
        do {
          const randomIndex = Math.floor(Math.random() * champData.length);
          randomChamp = champData[randomIndex];
        } while (
          prevIsChampSelect.some((champ) => champ.id === randomChamp.id)
        );

        const bgImage = `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/sprite/${randomChamp.image.sprite}`;

        const newChampPickData = {
          name: randomChamp.name,
          id: randomChamp.id,
          bgImage: bgImage,
          bgPosition: `-${randomChamp.image.x}px -${randomChamp.image.y}px`,
        };

        setChampPickData(newChampPickData);

        // 타이머 초기화
        setPickTime(27);
        return [...prevIsChampSelect, newChampPickData];
      });
    }

    return () => clearInterval(interval);
  }, [isTimerActive, pickTime, champData]);

  useEffect(() => {
    // 챔피언 선택 시 흑백 스타일을 유지
    setChampData((prevData) =>
      prevData.map((champ) => ({
        ...champ,
        grayscale: isChampSelect.some((selected) => selected.id === champ.id),
      }))
    );
  }, [isChampSelect]);

  // 챔피언 검색
  const [isChampSearch, setIsChampSearch] = useState("");

  const handleChampSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setIsChampSearch(value);
  };

  const isChampSelectBlueIndex = [0, 2, 4, 6, 9, 10, 13, 15, 17, 18];
  const isChampSelectRedIndex = [1, 3, 5, 7, 8, 11, 12, 14, 16, 19];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className={style.main}>
        <div className={style.container}>
          <Modal show={showModal}>
            <button className={style.close} onClick={closeModal}>
              시작하기
            </button>
          </Modal>
          {/* Header */}
          <Header
            isTeamName={isTeamName}
            isChampSelect={isChampSelect}
            pickTime={pickTime}
            isChampSelectBlueIndex={isChampSelectBlueIndex}
            isChampSelectRedIndex={isChampSelectRedIndex}
          />
          {/* Contents */}
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
