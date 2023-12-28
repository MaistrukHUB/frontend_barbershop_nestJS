import { createSlice } from "@reduxjs/toolkit";
import { IAuthState, IPublicUser } from "../../../common/@types/auth";

// Функція для отримання даних користувача з sessionStorage
const getUserFromSessionStorage = (): IPublicUser | null => {
  const userString = sessionStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};

// Функція для отримання токена з sessionStorage
const getTokenFromSessionStorage = (): string | null => {
  return sessionStorage.getItem("token");
};

const initialState: IAuthState = {
  token: getTokenFromSessionStorage() || "",
  user: getUserFromSessionStorage() || {
    id: null,
    name: "",
    phone: null,
    email: "",
    role: "",
    createdAt: "",
    updateAt: "",
    cart: [
      {
        id: null,
        createdAt: "",
        updateAt: "",
        user: null,
        cartProducts: [
          {
            id: null,
            img: "",
            name: "",
            category: "",
            extent: null,
            count: null,
            cost: null,
            createdAt: "",
            updatedAt: "",
            cart: null,
          },
        ],
      },
    ],
  },
  isLogged: !!getTokenFromSessionStorage(), // Встановити флаг isLogged в залежності від наявності токена,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isLogged = true;
      state.token = action.payload.token;
      sessionStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );
      sessionStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = initialState.user;
      state.isLogged = false;
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
