/* eslint-disable @next/next/no-img-element */
'use client';
import style from "./ban-pick.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const BanPick = () => {

  const params = useSearchParams();
  const teamNameBlue = params.get('blue');
  const teamNameRed = params.get('red');

  const singlePlayData = [
    "icon-top.webp",
    "icon-jgl.webp",
    "icon-mid.webp",
    "icon-bot.webp",
    "icon-spt.webp",
  ];



  return (
    <main className={style.main}>
      <div className={style.container}>
        {/* Header */}
        <div className={style.header}>
          {/* Name wrap */}
          <div className={style.team}>
            {/* Blue Team */}
            <div className={style.blue}>
                <h2>{teamNameBlue}</h2>
            </div>
            {/* Time */}
            <div className={style.time}>
                <span>TIME</span>
                <h2>: 40</h2>
                <span>BAN / PICK</span>
            </div>
            {/* Red Team  */}
            <div className={style.red}>
                <h2>{teamNameRed}</h2>
            </div>
          </div>
          {/* Time bar */}
          <div className={style.times}></div>
        </div>
        {/* Contents */}
        <div className={style.contents}>
          {/* Blue Pick Champ */}
          <div className={style.player}>
            {/* Item */}
            {singlePlayData.map((item, index) => (
              <div key={index} className={style.item_blue}>
                {/* Player Info */}
                  {/* Champ Name */}
                  <p>GRAVES</p>
                  <div>
                    <img src={`../../images/icon/${item}`} alt="position"></img>
                    <p>PLAYER {index + 1}</p>
                  </div>
                </div>
            ))}
            {/* Blue Ban Champ */}
            <div className={style.ban_blue}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          {/* Select Champ */}
          <div className={style.champ}>
            <div></div>
          </div>
          {/* Red Pick Champ */}
          <div className={style.player}>
            {/* Item */}
            {singlePlayData.map((item, index) => (
              <div key={index} className={style.item_red}>
                {/* Player Info */}
                  {/* Champ Name */}
                  <p>GRAVES</p>
                  <div>
                    <img src={`../../images/icon/${item}`} alt="position"></img>
                    <p>PLAYER {index + 1}</p>
                  </div>
                </div>
            ))}
            {/* Red Ban Champ */}
            <div className={style.ban_red}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BanPick;
