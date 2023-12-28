import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import {
  CartItemType,
  CartSliceState,
} from "../../../common/@types/cart";

const initialState: CartSliceState = {
  productsCart: [],
  totalPrice: 0,
  totalCount: 0,
};

const updateTotalPriceCount = (state: CartSliceState) => {
  state.totalPrice = state.productsCart.reduce((sum, obj) => {
    return obj.cost * obj.count + sum;
  }, 0);

  state.totalCount = state.productsCart.reduce((sum, obj) => {
    return obj.count + sum;
  }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItemType>) {
      const findProduct = state.productsCart.find(
        (obj) =>
          obj.name === action.payload.name &&
          obj.cost === action.payload.cost
      );
      if (findProduct) {
        findProduct.count++;
      } else {
        state.productsCart.push({
          ...action.payload,
          count: 1,
        });
      }
      updateTotalPriceCount(state);
    },
    minusProduct(state, action: PayloadAction<CartItemType>) {
      const findProduct = state.productsCart.find(
        (obj) => obj.idCartProduct === action.payload.idCartProduct
      );
      if (findProduct && findProduct.count <= 1) {
        state.productsCart = state.productsCart.filter(
          (obj) => obj.idCartProduct !== action.payload.idCartProduct
        );
      } else if (findProduct && findProduct.count > 1) {
        findProduct.count--;
      }
      updateTotalPriceCount(state);
    },
    removeProduct(state, action: PayloadAction<CartItemType>) {
      state.productsCart = state.productsCart.filter(
        (obj) => obj.idCartProduct !== action.payload.idCartProduct
      );
      updateTotalPriceCount(state);
    },
    clearCart(state) {
      state.productsCart = [];
      updateTotalPriceCount(state);
    },
  },
});

export const selectCartProducts = (state: RootState) =>
  state.cartSlice.productsCart;
export const selectCart = (state: RootState) => state.cartSlice;

export const { addProduct, removeProduct, minusProduct, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
