import React from "react";
import style from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={style.root}>
      <Link to={"/"} className={style.logo}>
        CARMA
      </Link>
      <a
        href='tel:+380960167568'
        rel='nofollow'
        className={style.phone}
      >
        +380960167568
      </a>
      <p className={style.est}>est. 2024</p>
    </footer>
  );
};

export default Footer;
