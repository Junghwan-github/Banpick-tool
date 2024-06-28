/* eslint-disable @next/next/no-img-element */
import style from "./body.module.css";
import positionChampList from "../../data/positionChampListData.json";
import image from "next/image";

const Body = ({
  champData,
  onChampListClick,
  onChampSelectClick,
  isChampSelect,
  champSearch,
  isChampSearch,
  setIsChampSearch,
  isPlayerName,
}) => {
  const renderPick = (index, icon, num, teamColor, borderColor) => {
    const isNext = isChampSelect.length === index;
    const playN = icon+teamColor;
    
    if (isChampSelect.length > index) {
      return (
        <div
          className={style[teamColor]}
          style={{
            backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${isChampSelect[index].id}_0.jpg')`,
            backgroundSize: "cover"
          }}
        >
          <p>{isChampSelect[index].name}</p>
          <div>
            <img
              src={`/images/icon/icon-${icon}.webp`}
              alt="position"
            ></img>
            <p>{isPlayerName[playN] ? isPlayerName[playN] : `PLAYER ${num}`  }</p>
          </div>
        </div>
      );
    }
    return (
      <div className={style[teamColor]}
      style={{
        borderBottom: isNext ? `1px solid ${borderColor}` : "1px solid #333"
      }}>
        <p></p>
        <div >
          <img src={`/images/icon/icon-${icon}.webp`} alt="position"></img>
          <p>{isPlayerName[playN] ? isPlayerName[playN] : `PLAYER ${num}`  }</p>
        </div>
      </div>
    );
  };

  const filteredChampData = champData.filter((champ) => {
    // isChampSearch가 배열인지 확인
    if (Array.isArray(isChampSearch)) {
      // 배열의 각 요소를 순회하며 champ.name과 비교
      return isChampSearch.some((searchTerm) =>
        champ.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // isChampSearch가 문자열일 경우 그대로 비교
      return champ.name.toLowerCase().includes(isChampSearch.toLowerCase());
    }
  });

  const handlePositionButtonClick = (positionKey) => {
    // positionKey에 해당하는 챔피언 이름 배열을 isChampSearch에 설정
    const positionChampNames = positionChampList.find(
      (position) => position[positionKey]
    )[positionKey];
    setIsChampSearch(positionChampNames);
  };

  return (
    <div className={style.contents}>
      {/* Blue Pick Champ */}
      <div className={style.player}>
        {/* Item */}
        {renderPick(6, "top", 1, "Blue" ,"#0079FF" )}
        {renderPick(9, "jgl", 2, "Blue", "#0079FF")}
        {renderPick(10, "mid", 3, "Blue", "#0079FF")}
        {renderPick(17, "bot", 4, "Blue", "#0079FF")}
        {renderPick(18, "spt", 5, "Blue", "#0079FF")}
      </div>
      {/* Select Champ */}
      <div className={style.champ}>
        <div className={style.champ_category}>
          <div>
            {positionChampList.map((position, index) => {
              const positionKey = Object.keys(position)[0];
              return (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => handlePositionButtonClick(positionKey)}
                  >
                    <img
                      src={`/images/icon/icon-${Object.keys(
                        position
                      )}.webp`}
                      alt={Object.keys(position)}
                    />
                  </button>
                </div>
              );
            })}
          </div>
          <div>
            <input
              type="text"
              placeholder="챔피언 이름 검색"
              onChange={champSearch}
            ></input>
          </div>
        </div>
        <div className={style.champ_list}>
          <ul>
            {filteredChampData.map((champ, index) => (
              <li key={champ.name}>
                <div
                  onClick={(e) => {
                    onChampListClick(e, index);
                  }}
                  data-name={champ.name}
                  data-id={champ.id}
                  style={{
                    backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/14.12.1/img/sprite/${champ.image.sprite})`,
                    backgroundPosition: `-${champ.image.x}px -${champ.image.y}px`,
                    filter: champ.grayscale ? "grayscale(100%)" : "none",
                  }}
                ></div>
                <p>{champ.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.champ_action}>
          <button type="button" onClick={onChampSelectClick}>
            챔피언 선택
          </button>
        </div>
      </div>
      {/* Red Pick Champ */}
      <div className={style.player}>
        {/* Item */}
        {renderPick(7, "top", 1, "Red", "#D92027")}
        {renderPick(8, "jgl", 2, "Red", "#D92027")}
        {renderPick(11, "mid", 3, "Red", "#D92027")}
        {renderPick(16, "bot", 4, "Red", "#D92027")}
        {renderPick(19, "spt", 5, "Red", "#D92027")}
      </div>
    </div>
  );
};

export default Body;
