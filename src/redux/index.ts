import { configureStore } from "@reduxjs/toolkit";
import overflowHiddenSlice from "./slice/overflowHidden";
import authSlice from "./slice/auth";
import productsSlice from "./slice/products";

const store = configureStore({
  reducer: { overflowHiddenSlice, authSlice, productsSlice },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
