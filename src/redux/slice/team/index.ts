import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../index";
import { instance } from "../../../utils/axios";
import { Teammate } from "../../../common/@types/teammate";

export const fetchTeammates = createAsyncThunk(
  "teammates/fetchTeammates",
  async () => {
    const { data } = await instance.get("/team/get-all");
    return data as Teammate[];
  }
);

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface TeammateSliceState {
  team: Teammate[];
  status: Status;
}

const initialState: TeammateSliceState = {
  team: [],
  status: Status.LOADING,
};

const teammateSlice = createSlice({
  name: "teammate",
  initialState,
  reducers: {
    setTeammate(state, action) {
      state.team = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeammates.pending, (state) => {
      state.team = [];
      state.status = Status.LOADING;
      console.log("pending");
    });
    builder.addCase(
      fetchTeammates.fulfilled,
      (state, action: PayloadAction<Teammate[]>) => {
        state.team = action.payload;
        state.status = Status.SUCCESS;
        console.log("fulfilled");
      }
    );
    builder.addCase(fetchTeammates.rejected, (state) => {
      state.team = [];
      state.status = Status.ERROR;
      console.log("error");
    });
  },
});

export const selectTeammate = (state: RootState) =>
  state.teammateSlice.team;

export const { setTeammate } = teammateSlice.actions;

export default teammateSlice.reducer;
