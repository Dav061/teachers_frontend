import { configureStore } from "@reduxjs/toolkit"
import Option, { optionData } from "../types"
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
    dropdown_value: Option
    options: optionData[]
  }
  cart: {
    items: optionData[]
  }
  moderApp: {
    input_value: string
    dropdown_value: Option
    start_day:string
    end_day:string
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
