/* eslint-disable @next/next/no-img-element */
"use client";
import style from "./ban-pick.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/header/header";
import Body from "../../components/body/body";
import Modal from "../../components/modal/modal";

const BanPick = () => {
  // Team Name
  const params = useSearchParams();
  const teamNameBlue = params.get("blue");
  const teamNameRed = params.get("red");

  const [showModal, setShowModal] = useState(true);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Modal
  const closeModal = () => {
    setShowModal(false);
    setIsTimerActive(true);
  }

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

  //Champ SelectButton

  const [isChampSelect, setIsChampSelect] = useState([]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsChampSelect((prevIsChampSelect) => [
      ...prevIsChampSelect,
      champPickData
    ]);
  };
 
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
      <Modal show={showModal} onClose={closeModal}>
      </Modal>
        {/* Header */}
        <Header teamNameBlue={teamNameBlue} teamNameRed={teamNameRed} isChampSelect={isChampSelect} isActive={isTimerActive} />
        {/* Contents */}
        <Body champData={champData} onChampListClick={handleChampClick} onChampSelectClick={handleButtonClick} isChampSelect={isChampSelect}/>
      </div>
    </main>
  );
};

export default BanPick;
