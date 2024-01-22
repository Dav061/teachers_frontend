import { createSlice } from "@reduxjs/toolkit"
// import Teacher from "../types";

const initialState = {
  input_value: "",
  dropdown_value: {
    id: 0,
    name: "Все статусы",
  },
  date_value: {
    start_date: "",
    end_date: "",
  },
}

const moderAppSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setAppInputValue(state, action) {
      state.input_value = action.payload
    },
    setAppDropdownValueId(state, action) {
      state.dropdown_value.id = action.payload
    },
    setAppDropdownValueName(state, action) {
      state.dropdown_value.name = action.payload
    },
    setAppStartDate(state, action) {
      state.date_value.start_date = action.payload
    },
    setAppEndDate(state, action) {
      state.date_value.end_date = action.payload
    },
    resetModerFilters(state) {
      return initialState;
    },
  },
})

export const {
  setAppDropdownValueId,
  setAppDropdownValueName,
  setAppInputValue,
  setAppStartDate,
  setAppEndDate,
  resetModerFilters,
} = moderAppSlice.actions
export default moderAppSlice.reducer
