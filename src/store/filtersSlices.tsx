import { createSlice } from "@reduxjs/toolkit";
import Option from "../types";

const initialState = {
  input_value: "",
  dropdown_value: {
    id: 0,
    name: "Любой факультет",
  },
  options: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setOptions(state, action) {
      state.options = action.payload;
    },
    setInputValue(state, action) {
      state.input_value = action.payload;
    },
    setDropdownValueId(state, action) {
      state.dropdown_value.id = action.payload;
    },
    setDropdownValueName(state, action) {
      state.dropdown_value.name = action.payload;
    },
  },
});

export const {
  setDropdownValueId,
  setDropdownValueName,
  setInputValue,
  setOptions,
} = filterSlice.actions;
export default filterSlice.reducer;
