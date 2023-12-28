import { configureStore } from "@reduxjs/toolkit";
import overflowHiddenSlice from "./slice/overflowHidden";
import authSlice from "./slice/auth";
import productsSlice from "./slice/products";
import priceSlice from "./slice/price";
import teammateSlice from "./slice/team";
import cartSlice from "./slice/cart";
import filtersSlice from "./slice/filters";

const store = configureStore({
  reducer: {
    overflowHiddenSlice,
    authSlice,
    productsSlice,
    priceSlice,
    teammateSlice,
    cartSlice,
    filtersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
