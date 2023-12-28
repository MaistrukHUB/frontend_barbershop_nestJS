import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../index";

type Category = {
  name: string;
  categoryProperty: string;
};

export interface FilterSliceState {
  selectedCategory: Category;
  searchValue: string;
}

const initialState: FilterSliceState = {
  selectedCategory: {
    name: "Всі",
    categoryProperty: "",
  },
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<Category>) {
      state.selectedCategory = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.selectedCategory = action.payload.selectedCategory;
      state.searchValue = action.payload.searchValue;
    },
  },
});

export const selectFilters = (state: RootState) => state.filtersSlice;
export const selectFiltersCategory = (state: RootState) =>
  state.filtersSlice.selectedCategory;

export const { setCategory, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
