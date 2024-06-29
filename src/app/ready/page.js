/* eslint-disable @next/next/no-img-element */
"use client";
import style from "../styles/home.module.css";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useRef } from "react";

const MatchModUrl = () => {
  const searchParams = useSearchParams();
  const [blueTeamURL, setBlueTeamURL] = useState("");
  const [redTeamURL, setRedTeamURL] = useState("");
  const [teamName, setTeamName] = useState({});
  const [playerName, setPlayerName] = useState({});
  const [blueIsCopy, setBlueIsCopy] = useState(false);
  const [redIsCopy, setRedIsCopy] = useState(false);

  const blueInputRef = useRef(null);
  const redInputRef = useRef(null);

  useEffect(() => {
    const blueURL = searchParams.get("blue");
    const redURL = searchParams.get("red");
    const teamNames = searchParams.get("teamName");
    const playerNames = searchParams.get("playerName");

    if (blueURL) {
      try {
        setBlueTeamURL(JSON.parse(blueURL));
      } catch (error) {
        console.error("Error parsing BlueTeamURL", error);
      }
    }
    if (redURL) {
      try {
        setRedTeamURL(JSON.parse(redURL));
      } catch (error) {
        console.error("Error parsing RedTeamURL", error);
      }
    }
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

  const query = new URLSearchParams({
    teamName: JSON.stringify(teamName),
    playerName: JSON.stringify(playerName),
  });

  const handleCopyButton = (inputRef) => {
  
    
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard
        .writeText(inputRef.current.value)
        .then(() => {
          if(inputRef.current.name === "blue") {
            setBlueIsCopy(!blueIsCopy);
          } else {
            setRedIsCopy(!redIsCopy);
          }
        })
        .catch((err) => {
          console.error("복사실패:", err);
        });
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className={style.main}>
        <div className={style.container}>
          <h1 className={style.title}>
            <img
              src="../../../images/icon/logo.svg"
              alt="밴픽 시뮬레이터"
            ></img>
          </h1>
          <section className={style.sec01}>
            <ul className={style.ready_ul}>
              <li>
                <label htmlFor="team-blue">블루팀 접속 URL</label>
                <div>
                  <input
                    ref={blueInputRef}
                    type="text"
                    placeholder="블루팀 이름을 입력해주세요"
                    name="blue"
                    id="team-blue"
                    value={`${blueTeamURL}?${query}`}
                    readOnly
                  ></input>
                  <button
                    className={`${style.clip} ${blueIsCopy ? style.active : ''}`}
                    type="button"
                    onClick={() => handleCopyButton(blueInputRef)}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                    <p>{`${blueIsCopy ? "Copied" : "Copy"}`}</p>
                  </button>
                </div>
              </li>
              <li>
                <label htmlFor="team-red">레드팀 접속 URL</label>
                <div>
                  <input
                    ref={redInputRef}
                    type="text"
                    placeholder="레드팀 이름을 입력해주세요"
                    name="red"
                    id="team-red"
                    value={`${redTeamURL}?${query}`}
                    readOnly
                  ></input>
                  <button
                    className={`${style.clip} ${redIsCopy ? style.active : ''}`}
                    type="button"
                    onClick={() => handleCopyButton(redInputRef)}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                    <p>{`${redIsCopy ? "Copied" : "Copy"}`}</p>
                  </button>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </Suspense>
  );
};

export default dynamic(() => Promise.resolve(MatchModUrl), { ssr: false }); 
