import React, { useEffect, useState } from "react";
import styles from "./SwitcherTheme.module.scss";

const SwitcherTheme = () => {
  const setTheme = (themeName: string) => {
    localStorage.setItem("theme", themeName);
    document.documentElement.setAttribute("data-theme", themeName);
  };

  const toggleTheme = () => {
    if (localStorage.getItem("theme") === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, []);

  return (
    <label className={styles.switch}>
      <input
        type='checkbox'
        onChange={toggleTheme}
        id={styles.slider}
      />
      <span className={styles.sliderRound}></span>
    </label>
  );
};

export default SwitcherTheme;
