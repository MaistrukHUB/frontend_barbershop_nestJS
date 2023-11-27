import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../../common/@types/auth";

const initialState: IAuthState = {
  user: {
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
  isLogged: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isLogged = true;
    },
    logout(state) {
      state.user = initialState.user;
      state.isLogged = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
