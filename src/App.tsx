import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import MainPage from "./pages/MainPage/MainPage"
import TeacherPage from "./pages/TeacherPage/TeacherPage"
import Breadcrumps from "./components/Breadcrumps/Breadcrumps"
import RegPage from "./pages/RegPage/RegPage"
import AuthPage from "./pages/AuthPage/AuthPage"
import ApplicationsHistoryTable from "./components/ApplicationsHistoryTable/ApplicationsHistoryTable"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
// import store from "./store/store";
import Cookies from "universal-cookie"
import { Response, cardInfoProps } from "./types"
import { updateCart, updateUser } from "./store/userSlice"
import React, { useState } from "react"
import Cart from "./components/Cart/Cart"
import CartPage from "./pages/CartPage/CartPage"
import ApplicationsHistoryPage from "./pages/ApplicationsHistoryPage/ApplicationsHistoryPage"
import { RootState } from "./store/store"
import { setTeachers } from "./store/filtersSlices"
import { setCart } from "./store/cartSlice"
import { TeachersMock } from "./consts"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import TeachersList from "./pages/TeachersList/TeachersList"
import Sas from "./pages/sas"
import TeacherAdminPanel from "./pages/TeacherAdminPanel/TeacherAdminPanel"
const cookies = new Cookies()
function App() {
  const url = window.location.pathname.split("/").pop()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  // const searchValue = useSelector(
  //   (state: RootState) => state.filter.input_value
  // )
  // const facultyValue = useSelector(
  //   (state: RootState) => state.filter.dropdown_value.name
  // )
  
  // const cart = useSelector((state: RootState) => state.cart.items.length)

  const login = async () => {
    try {
      const response: Response = await axios(
        "http://localhost:8000/user_info/",
        {
          method: "GET",
          withCredentials: true,
          // headers: {
          //   "Content-type": "application/json; charset=UTF-8",
          //   Authorization: `Bearer ${cookies.get("access_token")}`,
          // },
        }
      )
      console.log(response.data)
      dispatch(
        updateUser({
          is_authenticated: true,
          is_moderator: response.data["is_moderator"],
          user_id: response.data["user_id"],
          user_email: response.data["email"],
          current_cart: response.data["current_cart"],
        })
      )
    } catch {
      console.log("Пользоатель не авторизован!!!")
    }
  }

  // const fetchData = async () => {
  //   try {
  //     const params = searchValue
  //       ? `?search=${encodeURIComponent(searchValue)}&faculty=${encodeURIComponent(facultyValue)}`
  //       : `?faculty=${encodeURIComponent(facultyValue)}`;
  //     const response = await axios(`http://localhost:8000/teachers/${params}`, {
  //       method: "GET",
  //       withCredentials: true,
  //     })
  //     console.log(response)
  //     const teachers = response.data.teachers
  //     if (response.data.app_id) {
  //       dispatch(updateCart(response.data.app_id))
  //     }
  //     dispatch(setTeachers(teachers))
  //     setIsLoading(false)
  //     console.log(response.data.app_id)
  //     return response.data.app_id
  //   } catch (error) {
  //     createMock()
  //     setIsLoading(false)
  //   }
  // }

  const currentCart = useSelector((state: RootState) => state.user.current_cart)

  const fetchCart = async (app_id: number) => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/applications/${app_id}/`,
        {
          method: "GET",
          withCredentials: true,
        }
      )
      console.log(response.data)
      const teachers = response.data.teachers
      dispatch(setCart(teachers))
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (cookies.get("access_token")) {
      login()
      // fetchCart()
    }
  },[])
  // React.useEffect(() => {
  //   handleSmt()
  //   // const cartId = await fetchData()
  // })
  // const handleSmt = async () => {
  //   const cartId = await fetchData()
  //   await fetchCart(cartId)
  // }

  // const createMock = () => {
  //   let filteredTeachers: cardInfoProps[] = TeachersMock.filter(
  //     (teacher) => teacher.available == true
  //   )

  //   if (searchValue) {
  //     filteredTeachers = filteredTeachers.filter((teacher) =>
  //       teacher.title.includes(searchValue)
  //     )
  //   }

  //   if (facultyValue != "Любой факультет") {
  //     filteredTeachers = filteredTeachers.filter(
  //       (teacher) => teacher.faculty == facultyValue
  //     )
  //   }
  //   dispatch(setTeachers(filteredTeachers))
  // }
  return (
    <>
      <Header />
      <Breadcrumps />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/teachers_frontend/" replace />}
        />
        <Route
          path="/teachers_frontend/"
          element={<MainPage />}
        />
        <Route path="/teachers_frontend/:id" element={<TeacherPage />} />
        <Route
          path="/teachers_frontend/registration"
          element={<RegPage />}
        />
        <Route path="/teachers_frontend/auth" element={<AuthPage />} />
        <Route
          path="/teachers_frontend/history"
          element={<ApplicationsHistoryPage />}
        />
        <Route path="/teachers_frontend/cart" element={<CartPage />} />
        <Route
          path="/teachers_frontend/application/:id"
          element={<CartPage />}
        />
        <Route
          path="/teachers_frontend/teachers-list"
          element={<TeachersList />}
        />
        <Route
          path="/teachers_frontend/teachers-list/:id"
          element={<TeacherAdminPanel />}
        />
      </Routes>
      <ToastContainer autoClose={1000} pauseOnHover={false} />
    </>
  )
}

export default App
