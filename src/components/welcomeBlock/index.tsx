import style from "./WelcomeBlock.module.scss";

import React from "react";

const WelcomeBlock = () => {
  return (
    <div className={`${style.root} `}>
      <div className={style.mainPictureText}>
        <h2>karma</h2>
        <span>grooming company</span>
        <br />
      </div>
    </div>
  );
};

export default WelcomeBlock;
