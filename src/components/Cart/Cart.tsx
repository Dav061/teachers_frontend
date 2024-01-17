import React, { useEffect, useState } from "react"
import CartItem from "../CartItem/CartItem"
import { Response } from "../../types"
import Cookies from "universal-cookie"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

const cookies = new Cookies()
import { cartItemProps } from "../../types"

import styles from "./Cart.module.scss"
import Button from "../Button/Button"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RootState } from "../../store/store"
import { updateCart } from "../../store/userSlice"
import { toast } from "react-toastify"
import { setCart } from "../../store/cartSlice"

type lesson_time={date:number, time:number}

const Cart = () => {
  const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

  const [cartItems, setCartItems] = useState<cartItemProps[]>([])
  const [isCartMatched, setIsCartMatched] = useState<boolean>(true)
  const { id } = useParams<{ id: string }>() as { id: string }
  const currentCart = useSelector((state: RootState) => state.user.current_cart)

  const [DayLesson, setDayLesson] = useState<number>(1)
  const [TimeLesson, setTimeLesson] = useState<number>()


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartApplication = useSelector(
    (state: RootState) => state.user.current_cart
  )

  const fetchCartData = async () => {
    try {
      const url = isCartMatched
        ? `http://127.0.0.1:8000/applications/${cartApplication}/`
        : `http://127.0.0.1:8000/applications/${id}/`

      const response: Response = await axios(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      })

      setDayLesson(response.data.day_lesson)
      setTimeLesson(response.data.time_lesson)

      console.log(response.data)
      setCartItems(response.data.options)
    } catch (e) {
      console.log(e)
    }
  }

  const DayLessonName = daysOfWeek[DayLesson - 1];

  const formApplication = async (status_id: number, formData?: FormData) => {
    try {
      let updatedData = {
        status: status_id,
       };
       
       if (formData) {
        updatedData = {
          ...updatedData,
          ...Object.fromEntries(formData),
        };
       }
       console.log(updatedData)
      

      const response: Response = await axios(
        `http://localhost:8000/applications/${cartApplication}/update_by_user/`,
        {
          method: "PUT",
          data: updatedData,
          withCredentials: false,
          // headers: {
          //   "Content-type": "application/json; charset=UTF-8",
          //   Authorization: `Bearer ${cookies.get("access_token")}`,
          // },
        }
      )

      dispatch(updateCart(-1))
      navigate("/teachers_frontend/")
      if (status_id == 3) {
        toast.success("Заявка оформлена", {
          icon: "✅",
        })
      }
    } catch (e) {
      console.log(e)
      toast.success("Преподаватель занят", {
        icon: "✅",
      })
    }
  }

  const deleteItem = async (itemId: number) => {
    try {
      const responce = await axios(
        `http://localhost:8000/applications/${cartApplication}/delete_option/${itemId}/`,
        {
          method: "DELETE",
          // withCredentials: true,
          // headers: {
          //   "Content-type": "application/json; charset=UTF-8",
          //   Authorization: `Bearer ${cookies.get("access_token")}`,
          // },
        }
      )
      console.log(responce)
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== itemId)
      )
      console.log(cartItems)
      dispatch(setCart(cartItems))
    } catch (e) {
      console.log(e)
    }
  }

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData: FormData = new FormData(e.target as HTMLFormElement)
    const objectFromFormData = Object.fromEntries(formData);
    console.log(objectFromFormData);
    formApplication(3, formData)
  }

  useEffect(() => {
    if (id) {
      setIsCartMatched(currentCart.toString() == id)
    }
  }, [])

  useEffect(() => {
    fetchCartData()
  }, [isCartMatched, currentCart])

  if (isCartMatched) {
    return (
      <div className={styles.cart}>
        <form onSubmit={handleSubmit}>
        <div className={styles.cart__header}>
          <div className={styles.cart__header_title}>Корзина</div>
          <select className={styles.input} name="date" onChange={(e) => setDayLesson(parseInt(e.target.value))}>
            {daysOfWeek.map((day, index) => (
              <option key={index} value={index + 1}>
                {day}
              </option>
            ))}
          </select>
          <select className={styles.input} name="time" onChange={(e) => setTimeLesson(parseInt(e.target.value))}>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          
          <div
            className={styles.cart__header_clear}
            onClick={() => formApplication(2)}
          >
            Очистить заявку
          </div>
        </div>
        <div className={styles.cart__content}>
          {cartItems.map((option) => (
            <CartItem
              key={option.id}
              {...option}
              onDelete={deleteItem}
              updateAllow={true}
            />
          ))}
        </div>
        <div className={styles.cart__actions}>
          <Button
            // onClick={() => formApplication(3)}
            className={styles.cart__actions_send}
          >
            Отправить заявку
          </Button>
        </div>
        </form>
      </div>
    )
  } else {
    return (
      <div className={styles.cart}>
        <div className={styles.cart__header}>
          <div className={styles.cart__header_title}>Заявка №{id}</div>
          <div className={styles.cart__header_title}>{DayLessonName}</div>
          <div className={styles.cart__header_title}>Пара № {TimeLesson}</div>
        </div>
        <div className={styles.cart__content}>
          {cartItems.map((option) => (
            <CartItem
              key={option.id}
              {...option}
              onDelete={deleteItem}
              updateAllow={false}
            />
          ))}
        </div>
        <div className={styles.cart__actions}>
          <Link to="/teachers_frontend/history">
            <Button className={styles.cart__actions_back}>Назад</Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Cart
