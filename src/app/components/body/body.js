/* eslint-disable @next/next/no-img-element */
import style from "./body.module.css";

const Body = ({
  champData,
  onChampListClick,
  onChampSelectClick,
  isChampSelect,
}) => {
  const renderPick = (index, icon, playerNum, teamColor) => {
    if (isChampSelect.length > index) {
      return (
        <div
          className={style[teamColor]}
          style={{
            backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${isChampSelect[index].id}_0.jpg')`,
            backgroundSize: 'cover'
          }}
        >
          <p>{isChampSelect[index].name}</p>
          <div>
            <img
              src={`../../images/icon/icon-${icon}.webp`}
              alt="position"
            ></img>
            <p>PLAYER {playerNum}</p>
          </div>
        </div>
      );
    }
    return (
      <div className={style[teamColor]}>
        <p></p>
        <div>
          <img src={`../../images/icon/icon-${icon}.webp`} alt="position"></img>
          <p>PLAYER {playerNum}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={style.contents}>
      {/* Blue Pick Champ */}
      <div className={style.player}>
        {/* Item */}
        {renderPick(6, "top", 1, "item_blue")}
        {renderPick(9, "jgl", 2, "item_blue")}
        {renderPick(10, "mid", 3, "item_blue")}
        {renderPick(17, "bot", 4, "item_blue")}
        {renderPick(18, "spt", 5, "item_blue")}
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
                <img src="../../../images/icon/icon-mid.webp" alt="mid" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src="../../../images/icon/icon-bot.webp" alt="bot" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src="../../../images/icon/icon-spt.webp" alt="spt" />
              </a>
            </div>
          </div>
          <div>
            <input type="text" placeholder="챔피언 이름 검색"></input>
          </div>
        </div>
        <div className={style.champ_list}>
          <ul>
            {champData.map((champ, index) => (
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
        {renderPick(7, "top", 1, "item_red")}
        {renderPick(8, "jgl", 2, "item_red")}
        {renderPick(11, "mid", 3, "item_red")}
        {renderPick(16, "bot", 4, "item_red")}
        {renderPick(19, "spt", 5, "item_red")}
      </div>
    </div>
  );
};

export default Body;
