import React from "react";
import style from "./BigImgsBlock.module.scss";

const BigImgsBlock = () => {
  return (
    <div className={style.root}>
      <div className={style.imgAcademyBlock}>
        <div className={style.blockShadow}>
          <a href='#' className={style.digImageText}>
            Академія
          </a>
        </div>
      </div>
      <div className={style.imgAboutBloc}>
        <div className={style.blockShadow}>
          <a href='#' className={style.digImageText}>
            Детальніше про нас
          </a>
        </div>
      </div>
    </div>
  );
};

export default BigImgsBlock;
