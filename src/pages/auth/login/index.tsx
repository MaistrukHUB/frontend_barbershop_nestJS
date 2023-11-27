import React, { useState } from "react";
import style from "./Login.module.scss";
import { IPropsLogin } from "../../../common/@types/auth";

const Login: React.FC<IPropsLogin> = ({
  setEmail,
  setPassword,
  navigate,
  handelSubmit,
}): JSX.Element => {
  return (
    <div className={`${style.loginContainer} ${style.content}`}>
      <h2>Увійдіть до свого акаунту</h2>
      <form className={style.emailForm} onSubmit={handelSubmit}>
        <label htmlFor='email' className={style.label}>
          Логін:
        </label>
        <input
          type='text'
          id='email'
          onChange={(e) => setEmail(e.target.value)}
          className={style.input}
        />

        <label htmlFor='password' className={style.label}>
          Пароль:
        </label>
        <input
          type='password'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          className={style.input}
        />

        <button type='submit' className={style.button}>
          Увійти
        </button>
      </form>
    </div>
  );
};

export default Login;
