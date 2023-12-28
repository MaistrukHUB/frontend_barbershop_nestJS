import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../index";
import { instance } from "../../../utils/axios";
import { ProductItem } from "../../../common/@types/product";
import { Category } from "../../../common/@types/categories";

type FetchProductsParams = {
  selectedCategory: Category;
  searchValue: string;
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: FetchProductsParams) => {
    const { selectedCategory, searchValue } = params;
    const paramByFilters = {
      selectedCategory: selectedCategory.categoryProperty,
      searchValue,
    };
    console.log(selectedCategory);
    const { data } = await instance.post(
      `/products/get-all`,
      paramByFilters
    );
    return data as ProductItem[];
  }
);

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
