import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import InfoBlock from "../../components/InfoBlock/InfoBlock";
import Card from "../../components/Card/Card";
import DropDown from "../../components/Dropdown/Dropdown";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Skeleton from "../../components/Skeleton/Skeleton";
import { RootState } from "../../store/store"
import styles from "./mainpage.module.scss";
import { setTeachers } from "../../store/filtersSlices"
import { useDispatch, useSelector } from "react-redux"
import {
  setDropdownValueId,
  setDropdownValueName,
  setInputValue,
} from "../../store/filtersSlices"
import Teacher from "../../types";
import { cardInfoProps } from "../../types";
import { DOMEN, FACULTY} from "../../consts";
import { TeachersMock } from "../../consts";
import axios from "axios"
import Cookies from "universal-cookie"
import { updateCart } from "../../store/userSlice"
import { Response } from "../../types"
import { toast } from "react-toastify"
import { setCart } from "../../store/cartSlice"
const cookies = new Cookies()


const MainPage = () => {
  const dispatch = useDispatch()
  const searchValue = useSelector(
    (state: RootState) => state.filter.input_value
  )
  const facultyValue = useSelector(
    (state: RootState) => state.filter.dropdown_value.name
  )
  const teachers = useSelector((state: RootState) => state.filter.teachers)

  const [isLoading, setIsLoading] = useState(true)
  
  const createMock = () => {
    let filteredTeachers: cardInfoProps[] = TeachersMock.filter(
      (teacher) => teacher.available == true
    )

    if (searchValue) {
      filteredTeachers = filteredTeachers.filter((teacher) =>
        teacher.title.includes(searchValue)
      )
    }

    if (facultyValue != "Любой факультет") {
      filteredTeachers = filteredTeachers.filter(
        (teacher) => teacher.faculty == facultyValue
      )
    }
    dispatch(setTeachers(filteredTeachers))
  }

  const addTeacherToApp = async (id: number) => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/teachers/${id}/add_to_application/`,
        {
          method: "POST",
          withCredentials: true,
        }
      )
      console.log(response.data)
      if (response.data) {
        dispatch(updateCart(response.data.id))
        dispatch(setCart(response.data.teachers))
      }
      toast.success("Добавлен в заявку", {
        icon: "✅",
      })
    } catch (e:Response) {
      console.log(e.response.status)
      if (e.response.status==400){
        toast.error("Преподаватель уже добавлен", {
          icon: "😕",
        })
      }
      else {
        toast.error("Сперва авторизируйтесь", {
          icon: "😕",
        })
      }
    }
  }

  const currentCart = useSelector((state: RootState) => state.user.current_cart)
  // const fetchCart = async () => {
  //   try {
  //     const response: Response = await axios(
  //       `http://localhost:8000/applications/${currentCart}`,
  //       {
  //         method: "GET",
  //         // withCredentials: true,
  //       }
  //     )
  //     console.log(response.data)
  //     const teachers = response.data.teachers
  //     dispatch(setCart(teachers))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const fetchData = async () => {
    try {
      const params = searchValue
        ? `?search=${encodeURIComponent(searchValue)}&faculty=${encodeURIComponent(facultyValue)}`
        : `?faculty=${encodeURIComponent(facultyValue)}`;
      const response = await axios(`http://localhost:8000/teachers/${params}`, {
        method: "GET",
        withCredentials: true,
      })
      console.log(response)
      const teachers = response.data.teachers
      if (response.data.app_id) {
        dispatch(updateCart(response.data.app_id))
      }
      dispatch(setTeachers(teachers))
      setIsLoading(false)
      console.log(response.data.app_id)
      return response.data.app_id
    } catch (error) {
      createMock()
      setIsLoading(false)
    }
  }


  const cardAddButtonClick = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    addTeacherToApp(id)
    fetchData()
    // setTimeout(() => {
    //   fetchCart()
    // }, 200)
  }

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchData()
  }, [user.user_email])



  const handleSelect = (selectedTeacher: Teacher) => {
    dispatch(setDropdownValueName(selectedTeacher.name))
    dispatch(setDropdownValueId(selectedTeacher.id))
  }

  return (
    <div className={styles.mainpage}>
      <div className={styles.container}>
        <InfoBlock />
        <div className={styles.mainpage__actions}>
          <div className={styles.mainpage__input}>
            <Input
              searchValue={searchValue}
              onChangeValue={(i) => dispatch(setInputValue(i))}
            />
            <Button onClick={()=>fetchData()}>Поиск</Button>
          </div>
          <div className={styles.mainpage__filters}>
            <DropDown
              handleSelect={handleSelect}
              teachers={FACULTY}
              title={facultyValue}
            />
          </div>
        </div>

        <div className={styles.mainpage__inner}>
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : teachers.map((item: cardInfoProps) => (
                <Link
                  to={`/teachers_frontend/${item.id}`}
                  key={item.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card
                    onAddClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      cardAddButtonClick(item.id, e)
                    }
                    key={item.id}
                    {...item}
                  ></Card>
                </Link>
              ))}
        </div>
      </div>
    </div>
  )
}

export default MainPage
