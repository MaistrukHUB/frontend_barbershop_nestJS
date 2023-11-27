import React from "react";
import style from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={`${style.root}`}>
      <Link to={"/"} className={style.logo}>
        KARMA
      </Link>
      <p className={style.est}>нд-пн: 10:00 - 19:00</p>
    </footer>
  );
};

export default Footer;
