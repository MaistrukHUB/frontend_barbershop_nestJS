import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../index";
import { instance } from "../../../utils/axios";
import { ProductItem } from "../../../common/@types/product";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await instance.get("/products/get-all");
    return data as ProductItem[];
  }
);

// export type ProductItem = {
//   name: string;
//   rating: number | null;
//   type: string;
//   about: string;
//   category: string;
//   cost: number[];
//   extent: number[];
//   img: string[];
// };

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface ProductSliceState {
  products: ProductItem[];
  status: Status;
}

const initialState: ProductSliceState = {
  products: [],
  status: Status.LOADING,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products = [];
      state.status = Status.LOADING;
      console.log("pending");
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<ProductItem[]>) => {
        state.products = action.payload;
        state.status = Status.SUCCESS;
        console.log("fulfilled");
      }
    );
    builder.addCase(fetchProducts.rejected, (state) => {
      state.products = [];
      state.status = Status.ERROR;
      console.log("error");
    });
  },
});

export const selectProducts = (state: RootState) =>
  state.productsSlice.products;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
