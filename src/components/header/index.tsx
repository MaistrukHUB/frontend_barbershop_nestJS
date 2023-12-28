import React, { useEffect, useState } from "react";
import style from "./Header.module.scss";
import { headerNav } from "../../common/consts/navigation";
import { Link } from "react-router-dom";
import classNames from "classnames";
import SwitcherTheme from "../switcherTheme";
import {
  changeVisibleValue,
  visibleValue,
} from "../../redux/slice/overflowHidden";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { logout } from "../../redux/slice/auth";
import HeaderIconList from "../headerIconList";
import {
  Theme,
  toast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configToast } from "../../utils/configuration";

const Header: React.FC = () => {
  const isVisible: boolean = useAppSelector(visibleValue);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerStyle = {
    backgroundColor: isScrolled ? "var(--header-bg)" : "transparent",
    transition: "background-color 0.3s ease-in-out",
  };
  const loginButtonStyle = {
    color: isScrolled ? "var(--header-bg)" : "var(--white)",
    backgroundColor: isScrolled ? "var(--white)" : "var(--header-bg)",
    border: isScrolled ? "solid 1px var(--white)" : "transparent",
    transition: "background-color 0.3s ease-in-out",
  };
  const registerButtonStyle = {
    color: "var(--white)",
    border: isScrolled
      ? "solid 1px var(--white)"
      : "solid 1px var(--header-bg) ",
    transition: "background-color 0.3s ease-in-out",
  };

  const { isLogged, user, token } = useAppSelector(
    (state) => state.authSlice
  );
  const dispatch = useAppDispatch();

  const switcherVisibility = () => {
    dispatch(changeVisibleValue({ visible: !isVisible }));
  };

  const closeBurger = () => {
    dispatch(changeVisibleValue({ visible: false }));
  };

  const handelLogout = () => {
    toast.info("Виконано!", { ...configToast });
    dispatch(logout());
    closeBurger();
  };

  return (
    <header style={headerStyle} className={style.root}>
      <div
        className={classNames(style.burgerButton, {
          [style.visible]: isVisible ? "visible" : "",
        })}
        onClick={switcherVisibility}
      ></div>

      <ul
        className={classNames(style.navList, {
          [style.visible]: isVisible ? "visible" : "",
        })}
      >
        <HeaderIconList isVisible={isVisible} />

        {headerNav &&
          headerNav.map((item) => (
            <li
              className={style.navListItem}
              key={item.link}
              onClick={closeBurger}
            >
              <Link to={`${item.link}`}>{item.name}</Link>
            </li>
          ))}
        {isLogged ? (
          <li className={style.navListItem} onClick={closeBurger}>
            <Link to={"/history"}>Історія покупок</Link>
          </li>
        ) : (
          ""
        )}
        {user.role === "admin" ? (
          <li className={style.navListItem} onClick={closeBurger}>
            <Link to={"/updateDatabase"}>Сторінка адміна</Link>
          </li>
        ) : (
          ""
        )}
        {user.role === "admin" ? (
          ""
        ) : (
          <li className={style.navListItem}>
            <a
              onClick={closeBurger}
              href='tel:+380960167568'
              rel='nofollow'
              className={style.phoneLink}
            >
              +380960167568
            </a>
          </li>
        )}

        <li className={style.navListItem}>
          {isLogged ? (
            <>
              <div className={style.logged}>
                <div className={style.helloUser}>
                  <span>{user.name}</span>
                </div>
                <div
                  onClick={handelLogout}
                  className={style.logoutUser}
                >
                  Вийти з акаунта
                  <svg
                    version='1.1'
                    id='Capa_1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 384.971 384.971'
                  >
                    <g>
                      <g id='Sign_Out'>
                        <path
                          d='M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z'
                        />
                        <path
                          d='M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z'
                        />
                      </g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                    </g>
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className={style.authItems}>
                <Link
                  style={loginButtonStyle}
                  onClick={closeBurger}
                  className={style.itemBg}
                  to={"/login"}
                >
                  Увійти
                </Link>
                <Link
                  style={registerButtonStyle}
                  onClick={closeBurger}
                  className={style.itemBor}
                  to={"/register"}
                >
                  Зареєструватись
                </Link>
              </div>
            </>
          )}
        </li>
      </ul>
      <Link to={`/`} className={style.hederLogo}>
        KARMA
      </Link>
    </header>
  );
};

export default Header;
