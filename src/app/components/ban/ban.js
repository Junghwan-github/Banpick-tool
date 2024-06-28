import style from "./ban.module.css";

const Ban = ({
  isChampSelect,
  isChampSelectBlueIndex,
  isChampSelectRedIndex
}) => {
  const renderBan = (index, borderColor) => {
    const isNext = isChampSelect.length === index;

    if (isChampSelect.length > index) {
      return (
        <div
          style={{
            backgroundImage: `url(${isChampSelect[index].bgImage})`,
            backgroundPosition: isChampSelect[index].bgPosition,
          }}
        >
          <span className={style.ban_span}></span>
        </div>
      );
    }

    return <div style={{border: isNext ? `1px solid ${borderColor}`  : "1px solid #333" }}></div>;
  };

  const renderSequence = (team, bgColor, deg, ani) => {
    return (
      <div style={{ backgroundColor: `${bgColor}` }}>
        <h3>{team} TEAM BAN / PICK</h3>
        <span
          className={style.sequence}
          style={{
            transform: `rotate(${deg}deg) translate(0, 0%)`,
            "--animation-name": ani,
          }}
        ></span>
      </div>
    );
  };

  return (
    <div className={style.ban_card}>
      {/* Blue ban */}
      <div className={style.ban_blue}>
        {renderBan(0, "#0079FF")}
        {renderBan(2, "#0079FF")}
        {renderBan(4, "#0079FF")}
        {renderBan(13, "#0079FF")}
        {renderBan(15, "#0079FF")}
      </div>
      <div className={style.ban_etc}>
        {isChampSelectBlueIndex.includes(isChampSelect.length) &&
          renderSequence("BLUE", "#0079FF", -45, "seq1")}
        {isChampSelectRedIndex.includes(isChampSelect.length) &&
          renderSequence("RED", "#D92027", 135, "seq2")}
      </div>
      {/* Red ban */}
      <div className={style.ban_red}>
        {renderBan(1, "#D92027")}
        {renderBan(3, "#D92027")}
        {renderBan(5, "#D92027")}
        {renderBan(12, "#D92027")}
        {renderBan(14, "#D92027")}
      </div>
    </div>
  );
};

export default Ban;
