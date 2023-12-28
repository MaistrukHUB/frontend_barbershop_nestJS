// authRootComponent.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import { instance } from "../../utils/axios";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { login } from "../../redux/slice/auth";
import { AppErrors } from "../../errors";
import Registration from "./register";
import Home from "../home";
import * as yup from "yup";
import {
  Theme,
  toast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configToast } from "../../utils/configuration";

const AuthRootComponent: React.FC = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [serverError, setServerError] = useState<string[] | null>(
    null
  ); // Додавання стану для помилок з сервера

  const { user, isLogged } = useAppSelector(
    (state) => state.authSlice
  );

  const handleValidation = async () => {
    try {
      if (location.pathname === "/login") {
        const loginSchema = yup.object().shape({
          email: yup
            .string()
            .email()
            .required("Необхідно вказати адресу електронної пошти"),
          password: yup.string().required("Необхідно ввести пароль"),
        });

        await loginSchema.validate(
          {
            email,
            password,
          },
          { abortEarly: false }
        );
      } else {
        const registrationSchema = yup.object().shape({
          name: yup.string().required("Необхідно вказати ім'я"),
          phone: yup
            .string()
            .min(10, "Мінімальна довжина номера - 10 символів"),
          email: yup
            .string()
            .email()
            .required("Необхідно вказати адресу електронної пошти"),
          password: yup.string().required("Необхідно ввести пароль"),
          repeatPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Паролі мають збігатися"),
        });

        await registrationSchema.validate(
          {
            name,
            phone,
            email,
            password,
            repeatPassword,
          },
          { abortEarly: false }
        );
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path && err.message) {
            errors[err.path] = err.message;
          }
        });
        setValidationErrors(errors);
      }
    }
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleValidation();

      if (location.pathname === "/login") {
        const userData = {
          email,
          password,
        };
        const response = await instance.post("/auth/login", userData);
        toast.success("Вітаємо!", { ...configToast });
        dispatch(login(response.data));
        navigate("/");
      } else {
        if (password === repeatPassword) {
          const userData = {
            email,
            phone,
            name,
            password,
          };
          const response = await instance.post(
            "/auth/register",
            userData
          );
          toast.success("Вітаємо!", { ...configToast });
          if (
            response.data &&
            response.data.error &&
            response.data.message
          ) {
            console.error(response.data.message); // Выводим сообщение об ошибке
          } else {
            await dispatch(login(response.data));
            navigate("/");
          }
        } else {
          throw new Error(AppErrors.PasswordDoNotMatch);
        }
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.info("Помилка!", { ...configToast });
        setServerError([error.response.data.message]); // выводим сообщение об ошибке из ответа сервера
      } else {
        toast.info("Помилка!", { ...configToast });
        setServerError(["Сталася невідома помилка"]); // обрабатываем другие случаи ошибок
      }
    }
  };

  return (
    <div className='root'>
      {location.pathname === "/login" ? (
        <Login
          setEmail={setEmail}
          setPassword={setPassword}
          navigate={navigate}
          handelSubmit={handelSubmit}
          validationErrors={validationErrors}
          serverError={serverError}
        />
      ) : location.pathname === "/register" ? (
        <Registration
          setEmail={setEmail}
          setName={setName}
          setPhone={setPhone}
          setPassword={setPassword}
          setRepeatPassword={setRepeatPassword}
          navigate={navigate}
          handelSubmit={handelSubmit}
          validationErrors={validationErrors}
          serverError={serverError}
        />
      ) : (
        <Home />
      )}
    </div>
  );
};

export default AuthRootComponent;
