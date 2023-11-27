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
    backgroundColor: isScrolled ? "var(--primary-bg)" : "transparent",
    transition: "background-color 0.3s ease-in-out",
  };

  const { isLogged, user } = useAppSelector(
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
        className={classNames(style.headerIconsList, {
          [style.visible]: isVisible ? "visible" : "",
        })}
      >
        <li className={style.headerIconListItem}>
          <a
            className={style.instIcon}
            href='https://www.instagram.com/barber.fin/'
          >
            <svg
              aria-hidden='true'
              focusable='false'
              role='presentation'
              className={"icon icon-instagram"}
              viewBox='0 0 512 512'
            >
              <path
                fill={""}
                d='M256 49.5c67.3 0 75.2.3 101.8 1.5 24.6 1.1 37.9 5.2 46.8 8.7 11.8 4.6 20.2 10 29 18.8s14.3 17.2 18.8 29c3.4 8.9 7.6 22.2 8.7 46.8 1.2 26.6 1.5 34.5 1.5 101.8s-.3 75.2-1.5 101.8c-1.1 24.6-5.2 37.9-8.7 46.8-4.6 11.8-10 20.2-18.8 29s-17.2 14.3-29 18.8c-8.9 3.4-22.2 7.6-46.8 8.7-26.6 1.2-34.5 1.5-101.8 1.5s-75.2-.3-101.8-1.5c-24.6-1.1-37.9-5.2-46.8-8.7-11.8-4.6-20.2-10-29-18.8s-14.3-17.2-18.8-29c-3.4-8.9-7.6-22.2-8.7-46.8-1.2-26.6-1.5-34.5-1.5-101.8s.3-75.2 1.5-101.8c1.1-24.6 5.2-37.9 8.7-46.8 4.6-11.8 10-20.2 18.8-29s17.2-14.3 29-18.8c8.9-3.4 22.2-7.6 46.8-8.7 26.6-1.3 34.5-1.5 101.8-1.5m0-45.4c-68.4 0-77 .3-103.9 1.5C125.3 6.8 107 11.1 91 17.3c-16.6 6.4-30.6 15.1-44.6 29.1-14 14-22.6 28.1-29.1 44.6-6.2 16-10.5 34.3-11.7 61.2C4.4 179 4.1 187.6 4.1 256s.3 77 1.5 103.9c1.2 26.8 5.5 45.1 11.7 61.2 6.4 16.6 15.1 30.6 29.1 44.6 14 14 28.1 22.6 44.6 29.1 16 6.2 34.3 10.5 61.2 11.7 26.9 1.2 35.4 1.5 103.9 1.5s77-.3 103.9-1.5c26.8-1.2 45.1-5.5 61.2-11.7 16.6-6.4 30.6-15.1 44.6-29.1 14-14 22.6-28.1 29.1-44.6 6.2-16 10.5-34.3 11.7-61.2 1.2-26.9 1.5-35.4 1.5-103.9s-.3-77-1.5-103.9c-1.2-26.8-5.5-45.1-11.7-61.2-6.4-16.6-15.1-30.6-29.1-44.6-14-14-28.1-22.6-44.6-29.1-16-6.2-34.3-10.5-61.2-11.7-27-1.1-35.6-1.4-104-1.4z'
              ></path>
              <path
                fill={`#${"styleIcons"} `}
                d='M256 126.6c-71.4 0-129.4 57.9-129.4 129.4s58 129.4 129.4 129.4 129.4-58 129.4-129.4-58-129.4-129.4-129.4zm0 213.4c-46.4 0-84-37.6-84-84s37.6-84 84-84 84 37.6 84 84-37.6 84-84 84z'
              ></path>
              <circle
                fill={`#${"styleIcons"} `}
                cx='390.5'
                cy='121.5'
                r='30.2'
              ></circle>
            </svg>
          </a>
        </li>
        <li className={style.headerIconListItem}>
          <a
            className={style.instIcon}
            href='https://www.facebook.com/vladislav.maistruk'
          >
            <svg
              aria-hidden='true'
              focusable='false'
              role='presentation'
              className={"icon icon-facebook"}
              viewBox='0 0 20 20'
            >
              <path
                fill={`#${"styleIcons"} `}
                d='M18.05.811q.439 0 .744.305t.305.744v16.637q0 .439-.305.744t-.744.305h-4.732v-7.221h2.415l.342-2.854h-2.757v-1.83q0-.659.293-1t1.073-.342h1.488V3.762q-.976-.098-2.171-.098-1.634 0-2.635.964t-1 2.72V9.47H7.951v2.854h2.415v7.221H1.413q-.439 0-.744-.305t-.305-.744V1.859q0-.439.305-.744T1.413.81H18.05z'
              ></path>
            </svg>
          </a>
        </li>
        <li className={style.headerIconListItem}>
          <a href='#' className={style.instIcon}>
            <svg viewBox='0 0 24 24' fill={`#${"styleIcons"}`}>
              {" "}
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10.5547 2.16806C11.0142 2.47441 11.1384 3.09528 10.8321 3.55481L7.20184 9.00012H16.7982L13.168 3.55481C12.8616 3.09528 12.9858 2.47441 13.4453 2.16806C13.9048 1.8617 14.5257 1.98588 14.8321 2.44541L19.2019 9.00014H22C22.55 9.00014 23 9.45014 23 10.0001L22.97 10.2701L20.43 19.5401C20.19 20.3801 19.42 21.0001 18.5 21.0001H5.5C4.58 21.0001 3.81 20.3801 3.58 19.5401L1.04 10.2701C1.01 10.1801 1 10.0901 1 10.0001C1 9.45014 1.45 9.00014 2 9.00014H4.79813L9.16795 2.44541C9.4743 1.98588 10.0952 1.8617 10.5547 2.16806ZM18.5 19.0001L5.51 19.0101L3.31 11.0001H20.7L18.5 19.0001Z'
              ></path>
            </svg>
          </a>
        </li>
        <li>
          <SwitcherTheme />
        </li>
      </ul>
      <ul
        className={classNames(style.navList, {
          [style.visible]: isVisible ? "visible" : "",
        })}
      >
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
                  Вітаємо: <span>{user.name}</span>
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
                  onClick={closeBurger}
                  className={style.itemBg}
                  to={"/login"}
                >
                  Увійти
                </Link>
                <Link
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
