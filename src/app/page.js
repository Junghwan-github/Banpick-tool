/* eslint-disable @next/next/no-img-element */
"use client";
import style from "./styles/home.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [teamName, setTeamName] = useState({});
  const [selectedMode, setSelectedMode] = useState("");

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setTeamName({
      ...teamName,
      [name]: value,
    });
  };

  const handleModeChange = (e) => {
    setSelectedMode(e.target.value);
  };

  const handleStart = (e) => {
    e.preventDefault();
    if (selectedMode) {
      const searchParams = new URLSearchParams(teamName).toString();
      router.push(`/ban-pick/${selectedMode}?${searchParams}`);
    } else {
      alert("모드를 선택해주세요");
    }
  };

  return (
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
                placeholder="블루팀 이름을 입력해주세요"
                name="blue"
                id="team-blue"
                onChange={handleInputValue}
              ></input>
            </li>
            <li>
              <label htmlFor="team-red">레드팀</label>
              <input
                type="text"
                placeholder="레드팀 이름을 입력해주세요"
                name="red"
                id="team-red"
                onChange={handleInputValue}
              ></input>
            </li>
            <li>
              <div>
                <label htmlFor="single-mode">싱글</label>
                <input
                  type="radio"
                  id="solo-mode"
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
            <li>
              <button onClick={handleStart}>시작하기</button>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
