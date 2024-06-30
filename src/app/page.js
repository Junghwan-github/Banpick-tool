/* eslint-disable @next/next/no-img-element */
"use client";
import style from "./styles/home.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import positionChampList from "./data/positionChampListData.json";
import Modal from "./components/modal/modal";
import { Suspense } from "react";

export default function Home() {
  const router = useRouter();
  const [teamName, setTeamName] = useState({});
  const [selectedMode, setSelectedMode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isPlayerName, setIsPlayerName] = useState({});
  const [ws, setWs] = useState(null);

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setTeamName({
      ...teamName,
      [name]: value,
    });
    console.log(teamName);
  };

  const handleModeChange = (e) => {
    setSelectedMode(e.target.value);
  };

  const handleStart = (e) => {
    e.preventDefault();

    if (selectedMode === "match") {
      const socket = new WebSocket("wss://banpick-wc.glitch.me");

      socket.onopen = () => {
        socket.send(JSON.stringify({ type: "create" }));
      };

      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.type === "created") {
          const { matchId } = data;
          const blueURL = `${window.location.origin}/ready/${matchId}/blue`;
          const redURL = `${window.location.origin}/ready/${matchId}/red`;

          const query = new URLSearchParams({
            blue: JSON.stringify(blueURL),
            red: JSON.stringify(redURL),
            teamName: JSON.stringify(teamName),
            playerName: JSON.stringify(isPlayerName),
          });

          router.push(`/ready?${query}`);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error: ", error);
      };

      setWs(socket);
    } else if (selectedMode === "single") {
      const query = new URLSearchParams({
        teamName: JSON.stringify(teamName),
        playerName: JSON.stringify(isPlayerName),
      });
      router.push(`/ban-pick/${selectedMode}?${query}`);
    } else {
      alert("모드를 선택해주세요");
    }
  };

  const handlePlayerName = (e) => {
    const { name, value } = e.target;
    setIsPlayerName({ ...isPlayerName, [name]: value });
    console.log(isPlayerName);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const playerSetting = () => {
    setShowModal(true);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className={style.main}>
        <div className={style.container}>
          <h1 className={style.title}>
            <img src="./images/icon/logo.svg" alt="밴픽 시뮬레이터"></img>
          </h1>
          <section className={style.sec01}>
            <ul>
              <li>
                <label htmlFor="team-blue">블루팀</label>
                <input
                  type="text"
                  placeholder="블루팀 이름을 입력해주세요. (미 설정 시 BLUE TEAM)"
                  name="blue"
                  id="team-blue"
                  onChange={handleInputValue}
                ></input>
              </li>
              <li>
                <label htmlFor="team-red">레드팀</label>
                <input
                  type="text"
                  placeholder="레드팀 이름을 입력해주세요. (미 설정 시 RED TEAM)"
                  name="red"
                  id="team-red"
                  onChange={handleInputValue}
                ></input>
              </li>
              <li>
                <div>
                  <button type="button" onClick={playerSetting}>
                    플레이어 닉네임 설정
                  </button>
                </div>
                <div>
                  <label htmlFor="single-mode">싱글</label>
                  <input
                    type="radio"
                    id="single-mode"
                    name="mode"
                    value="single"
                    onChange={handleModeChange}
                    checked={selectedMode === "single"}
                  ></input>
                </div>
                <div>
                  <label htmlFor="match-mode">매치</label>
                  <input
                    type="radio"
                    id="match-mode"
                    name="mode"
                    value="match"
                    onChange={handleModeChange}
                    checked={selectedMode === "match"}
                  ></input>
                </div>
              </li>
              <p className={`${style.match_info} ${selectedMode === "match" ? style.active : ""}`}><span>* 매치 모드</span> - 현재는 무료 서버 사용 중이라 [시작하기] 버튼 클릭후 간헐적 수 초정도 로딩이 발생할 수 있습니다. </p>
              <Modal show={showModal}>
                <div className={style.player_setting}>
                  <div>
                    <h3>플레이어 닉네임</h3>
                    <span>※ 설정 하지 않을시 PLAYER로 설정됩니다.</span>
                    <div className={style.player_wrap}>
                      <div>
                        <h4>블루팀</h4>
                        <ul>
                          {positionChampList.map((position, index) => (
                            <li key={index}>
                              <label htmlFor={`blue-${Object.keys(position)}`}>
                                <img
                                  src={`../../images/icon/icon-${Object.keys(
                                    position
                                  )}.webp`}
                                  alt={Object.keys(position)}
                                />
                              </label>
                              <input
                                type="text"
                                id={`blue-${Object.keys(position)}`}
                                placeholder={`BLUE ${Object.keys(
                                  position
                                )[0].toUpperCase()}`}
                                name={`${Object.keys(position)}Blue`}
                                onChange={handlePlayerName}
                              ></input>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>레드팀</h4>
                        <ul>
                          {positionChampList.map((position, index) => (
                            <li key={index}>
                              <label htmlFor={`blue-${Object.keys(position)}`}>
                                <img
                                  src={`../../images/icon/icon-${Object.keys(
                                    position
                                  )}.webp`}
                                  alt={Object.keys(position)}
                                />
                              </label>
                              <input
                                type="text"
                                id={`red-${Object.keys(position)}`}
                                placeholder={`RED ${Object.keys(
                                  position
                                )[0].toUpperCase()}`}
                                name={`${Object.keys(position)}Red`}
                                onChange={handlePlayerName}
                              ></input>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button className={style.close} onClick={closeModal}>
                    확인
                  </button>
                </div>
              </Modal>
              <li>
                <button onClick={handleStart}>시작하기</button>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </Suspense>
  );
}
