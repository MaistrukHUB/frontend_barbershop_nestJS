import style from "./WelcomeBlock.module.scss";

import React from "react";

const WelcomeBlock = () => {
  return (
    <div className={`${style.root} `}>
      <div className={style.mainPictureText}>
        <span>CARMA HAIR SALON </span>
        <br />
        <p>
          ЦЕ МІСЦЕ НАПОВНЕНЕ ТВОРЧІСТЮ ТА ПРИСТРАСТЮ ДО РЕМЕСЛА, ДЕ
          ЛЮДИ ЩОДНЯ СТАЮТЬ КРАЩИМИ ЧЕРЕЗ СПІЛКУВАННЯ, НАЙКРАЩИЙ
          СЕРВІС ТА АТМОСФЕРУ, ЯКУ ВОНИ ОТРИМУЮТЬ.{" "}
        </p>
      </div>
    </div>
  );
};

export default WelcomeBlock;
