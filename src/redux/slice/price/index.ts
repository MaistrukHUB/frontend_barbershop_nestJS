import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../index";
import { instance } from "../../../utils/axios";
import { PriceItem } from "../../../common/@types/price";

export const fetchPrice = createAsyncThunk(
  "price/fetchPrice",
  async () => {
    const { data } = await instance.get("/price/getAllPrice");
    return data as PriceItem[];
  }
);

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface ProductSliceState {
  price: PriceItem[];
  status: Status;
}


const initialState: ProductSliceState = {
  price: [],
  status: Status.LOADING,
};

const priceSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPrice(state, action) {
      state.price = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPrice.pending, (state) => {
      state.price = [];
      state.status = Status.LOADING;
      console.log("pending");
    });
    builder.addCase(
      fetchPrice.fulfilled,
      (state, action: PayloadAction<PriceItem[]>) => {
        state.price = action.payload;
        state.status = Status.SUCCESS;
        console.log("fulfilled");
      }
    );
    builder.addCase(fetchPrice.rejected, (state) => {
      state.price = [];
      state.status = Status.ERROR;
      console.log("error");
    });
  },
});

export const selectPrice = (state: RootState) =>
  state.priceSlice.price;

export const { setPrice } = priceSlice.actions;

export default priceSlice.reducer;
