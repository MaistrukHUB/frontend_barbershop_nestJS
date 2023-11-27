import React, { useState } from "react";
import style from "./Registration.module.scss";
import { IPropsRegister } from "../../../common/@types/auth";

const Registration: React.FC<IPropsRegister> = ({
  setEmail,
  setName,
  setPhone,
  setPassword,
  setRepeatPassword,
  navigate,
  handelSubmit,
}): JSX.Element => {
  return (
    <div
      className={`${style.registrationContainer} ${style.content}`}
    >
      <h2>Реєстрація</h2>
      <form
        className={style.registrationForm}
        onSubmit={handelSubmit}
      >
        <label htmlFor='name' className={style.label}>
          Ім'я:
        </label>
        <input
          type='text'
          id='name'
          onChange={(e) => setName(e.target.value)}
          className={style.input}
        />

        <label htmlFor='phone' className={style.label}>
          Телефон:
        </label>
        <input
          type='number'
          id='phone'
          onChange={(e) => setPhone(parseInt(e.target.value, 10))}
          className={style.input}
        />

        <label htmlFor='email' className={style.label}>
          Електронна пошта:
        </label>
        <input
          type='email'
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

        <label htmlFor='repeatPassword' className={style.label}>
          Пароль:
        </label>
        <input
          type='repeatPassword'
          id='repeatPassword'
          onChange={(e) => setRepeatPassword(e.target.value)}
          className={style.input}
        />

        <button type='submit' className={style.button}>
          Зареєструватися
        </button>
        <img
          src='https://scontent-iev1-1.cdninstagram.com/v/t51.2885-15/399600588_1430179787711986_8928374665428252411_n.jpg?stp=dst-jpg_e35_p1080x1080&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent-iev1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=kmWR1ZDJyz0AX8VgJbj&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzIzMTgxMzk3NDU5MjE0NjQ3NA%3D%3D.2-ccb7-5&oh=00_AfBOeSDEkulBPkz7EQV34oWfMFLk-1YAT3aRQebFYYbs9Q&oe=655D59E3&_nc_sid=ee9879'
          alt=''
        />
      </form>
    </div>
  );
};

export default Registration;
