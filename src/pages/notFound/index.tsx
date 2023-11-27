import style from "./NotFound.module.scss";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className={`${style.root} container`}>
      <span>😕</span>
      <p>Сторінку не знайдено</p>
    </div>
  );
};

export default NotFound;
