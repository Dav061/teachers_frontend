import { createSlice } from "@reduxjs/toolkit";
import Teacher from "../types";

const initialState = {
  input_value: "",
  dropdown_value: {
    id: 0,
    name: "Любой факультет",
  },
  teachers: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setTeachers(state, action) {
      state.teachers = action.payload;
    },
    resetMainFilters(state) {
      return initialState;
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
  setTeachers,
  resetMainFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
