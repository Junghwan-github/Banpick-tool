import style from "./ban.module.css";

const Ban = ({ isChampSelect }) => {
  const renderBan = (index) => {
    if (isChampSelect.length > index) {
      return (
        <div
          style={{
            backgroundImage: `url(${isChampSelect[index].bgImage})`,
            backgroundPosition: isChampSelect[index].bgPosition,
          }}
        ></div>
      );
    }
    return <div></div>;
  };

  return (
    <div className={style.ban_card}>
      {/* Blue ban */}
      <div className={style.ban_blue}>
        {renderBan(0)}
        {renderBan(2)}
        {renderBan(4)}
        {renderBan(13)}
        {renderBan(15)}
      </div>
      <div className={style.ban_etc}></div>
      {/* Red ban */}
      <div className={style.ban_red}>
        {renderBan(1)}
        {renderBan(3)}
        {renderBan(5)}
        {renderBan(12)}
        {renderBan(14)}
      </div>
    </div>
  );
};

export default Ban;
