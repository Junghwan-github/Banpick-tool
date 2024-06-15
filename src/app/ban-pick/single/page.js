/* eslint-disable @next/next/no-img-element */
"use client";
import style from "./ban-pick.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const BanPick = () => {
  const params = useSearchParams();
  const teamNameBlue = params.get("blue");
  const teamNameRed = params.get("red");

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
          image: {
            full: champ.image.full,
            sprite: champ.image.sprite,
            x: champ.image.x,
            y: champ.image.y,
            w: champ.image.w,
            h: champ.image.h,
          },
        };
      });

      setChampData(champDataArr);
    };
    fetchData();
  }, []);

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
              <h2>{teamNameBlue ? teamNameBlue : "BLUE TEAM"}</h2>
            </div>
            {/* Time */}
            <div className={style.time}>
              <span>TIME</span>
              <h2>: 40</h2>
              <span>BAN / PICK</span>
            </div>
            {/* Red Team  */}
            <div className={style.red}>
              <h2>{teamNameRed ? teamNameRed : "RED TEAM"}</h2>
            </div>
          </div>
          {/* Time bar */}
          <div className={style.times}></div>
          {/* Ban card */}
          <div className={style.ban_card}>
            {/* Blue ban */}
            <div className={style.ban_blue}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={style.ban_etc}></div>
            {/* Red ban */}
            <div className={style.ban_red}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
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
          </div>
          {/* Select Champ */}
          <div className={style.champ}>
            <div className={style.champ_category}>
              <div>
                <div>
                  <a href="#">
                    <img src="../../../images/icon/icon-top.webp" alt="top" />
                  </a>
                </div>
                <div>
                  <a href="#">
                    <img src="../../../images/icon/icon-jgl.webp" alt="jgl" />
                  </a>
                </div>
                <div>
                  <a href="#">
                    <img src="../../../images/icon/icon-mid.webp" alt="top" />
                  </a>
                </div>
                <div>
                  <a href="#">
                    <img src="../../../images/icon/icon-bot.webp" alt="top" />
                  </a>
                </div>
                <div>
                  <a href="#">
                    <img src="../../../images/icon/icon-spt.webp" alt="top" />
                  </a>
                </div>
              </div>
              <div>
                <input type="text" placeholder="챔피언 이름 검색"></input>
              </div>
            </div>
            <div className={style.champ_list}>
              <ul>
                {champData.map((champ) => (
                  <li key={champ.name}>
                    <div
                      style={{
                        "background-image": `url(https://ddragon.leagueoflegends.com/cdn/14.12.1/img/sprite/${champ.image.sprite})`,
                        "background-position": `-${champ.image.x}px -${champ.image.y}px`,
                      }}
                    ></div>
                    <p>{champ.name}</p>
                  </li>
                ))}
              </ul>
              <button type="button">챔피언 선택</button>
            </div>
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default BanPick;
