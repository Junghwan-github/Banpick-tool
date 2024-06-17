import style from "./header.module.css";
import Ban from "../ban/ban";
import { useState, useEffect } from "react";


const Header = ({teamNameBlue, teamNameRed, isChampSelect, isActive}) => {

    const [pickTime, setPickTime] = useState(25);
   

    useEffect(() => {
        let interval = null;

        if(isActive && pickTime > 0) {
            interval = setInterval(() => {
                setPickTime((prevPickTime) => prevPickTime - 1);
            }, 1000);
        } else if(pickTime === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, pickTime]);


    const percentage = (pickTime / 25) * 100;

    return (
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
              <h2>{Math.floor(pickTime / 60)}:{pickTime % 60 < 10 ? `0${pickTime % 60}` : pickTime % 60}</h2>
              <span>BAN / PICK</span>
            </div>
            {/* Red Team  */}
            <div className={style.red}>
              <h2>{teamNameRed ? teamNameRed : "RED TEAM"}</h2>
            </div>
          </div>
          {/* Time bar */}
          <div className={style.times}>
            <div className={style.progress_bar} style = {{ width: `${percentage}%`}}></div>
          </div>
          {/* Ban card */}
          <Ban isChampSelect={isChampSelect} />
        </div>
    );
};

export default Header;

