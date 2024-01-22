import { configureStore } from "@reduxjs/toolkit"
import Teacher, { Dates, teacherData } from "../types"
import userReducer from "./userSlice"
import filterReducer from "./filtersSlices"
import cartReducer from "./cartSlice"
import moderAppReducer from "./moderAppSlice"

export interface RootState {
  user: {
    user_id: BigInteger
    user_email: string
    is_authenticated: boolean
    is_moderator: boolean
    current_cart: number
    // l:number
  }
  filter: {
    start_day: any
    end_day: any
    input_value: string
    dropdown_value: Teacher
    teachers: teacherData[]
  }
  cart: {
    items: teacherData[]
  }
  moderApp: {
    input_value: string
    dropdown_value: Teacher
    date_value: Dates
  }
}

const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    cart: cartReducer,
    moderApp: moderAppReducer,
  },
})

export default store

// Экспортируйте тип RootState
// export type RootState = ReturnType<typeof store.getState>;
