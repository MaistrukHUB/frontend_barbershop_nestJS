import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import { instance } from "../../utils/axios";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { login } from "../../redux/slice/auth";
import { AppErrors } from "../../errors";
import Registration from "./register";
import Home from "../home";

const AuthRootComponent: React.FC = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { user, isLogged } = useAppSelector(
    (state) => state.authSlice
  );
  console.log(user, isLogged);

  const handelSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (location.pathname === "/login") {
      try {
        const userData = {
          email,
          password,
        };
        const user = await instance.post("/auth/login", userData);
        dispatch(login(user.data));
        navigate("/");
      } catch (error) {
        return error;
      }
    } else {
      if (password === repeatPassword) {
        try {
          const userData = {
            email,
            phone,
            name,
            password,
          };
          const newUser = await instance.post(
            "/auth/register",
            userData
          );
          await dispatch(login(newUser.data));
          navigate("/");
        } catch (error) {
          return error;
        }
      } else {
        throw new Error(AppErrors.PasswordDoNotMatch);
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
        />
      ) : (
        <Home />
      )}
    </div>
  );
};

export default AuthRootComponent;
