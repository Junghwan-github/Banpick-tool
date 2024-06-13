/* eslint-disable @next/next/no-img-element */
"use client";
import style from "./styles/home.module.css";
import { useEffect, useState, React } from "react";

export default function Home() {
  return (
    <main className={style.main}>
      <div className={style.container}>
        <h1 className={style.title}>
          <img src="./images/icon/logo.svg" alt="밴픽 시뮬레이터"></img>
        </h1>
        <section className={style.sec01}>
          <form action="#" method="post">
            <ul>
              <li>
                <label for="team-blue">블루팀</label>
                <input
                  type="text"
                  placeholder="블루팀 이름을 입력해주세요"
                  id="team-blue"
                ></input>
              </li>
              <li>
                <label for="team-red">레드팀</label>
                <input
                  type="text"
                  placeholder="레드팀 이름을 입력해주세요"
                  id="team-red"
                ></input>
              </li>
              <li>
                <div>
                  <label for="solo-mode">단독</label>
                  <input
                    type="radio"
                    id="solo-mode"
                    name="mode"
                    value="solo"
                  ></input>
                </div>
                <div>
                  <label for="match-mode">매치</label>
                  <input
                    type="radio"
                    id="match-mode"
                    name="mode"
                    value="match"
                  ></input>
                </div>
              </li>
              <li>
                <button type="submit">시작하기</button>
              </li>
            </ul>
          </form>
        </section>
      </div>
    </main>
  );
}
