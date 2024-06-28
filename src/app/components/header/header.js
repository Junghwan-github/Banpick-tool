import style from "./header.module.css";
import Ban from "../ban/ban";

const Header = ({
  isTeamName,
  isChampSelect,
  pickTime,
  isChampSelectRedIndex,
  isChampSelectBlueIndex
}) => {
  const percentage = (pickTime / 27) * 100;

  return (
    <div className={style.header}>
      {/* Name wrap */}
      <div className={style.team}>
        {/* Blue Team */}
        <div className={style.blue}>
          <h2>{isTeamName.blue ? isTeamName.blue : "BLUE TEAM"}</h2>
        </div>
        {/* Time */}
        <div className={style.time}>
          <span>TIME</span>
          <h2>
            {Math.floor(pickTime / 60)}:
            {pickTime % 60 < 10 ? `0${pickTime % 60}` : pickTime % 60}
          </h2>
          <span>BAN / PICK</span>
        </div>
        {/* Red Team  */}
        <div className={style.red}>
          <h2>{isTeamName.red ? isTeamName.red : "RED TEAM"}</h2>
        </div>
      </div>
      {/* Time bar */}
      <div className={style.times}>
        <div
          className={style.progress_bar}
          style={{
            width: `${percentage}%`,
            transition: percentage === 100 ? "none" : "linear 1s",
          }}
        ></div>
      </div>
      {/* Ban card */}
      <Ban
        isChampSelect={isChampSelect}
        isChampSelectRedIndex={isChampSelectRedIndex}
        isChampSelectBlueIndex={isChampSelectBlueIndex}
      />
    </div>
  );
};

export default Header;
