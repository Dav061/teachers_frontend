import React, { useEffect, useState } from "react"

import Button from "../../../components/Button/Button"
import defTeacher from "../../../assets/icons/none.png"

import styles from "./teacherinfo.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { Response } from "../../../types"

import { cardInfoProps } from "../../../types"
import { DOMEN } from "../../../consts"
import { OptionsMock } from "../../../consts"
import axios from "axios"
import { updateCart } from "../../../store/userSlice"
import { toast } from "react-toastify"

type TeacherInfoProps = {
  id: string;
};


const TeacherInfo: React.FC<TeacherInfoProps> = ({ id }) => {
  const dispatch = useDispatch()
  const [mock, setMock] = useState(false);
  const [info, setInfo] = useState<cardInfoProps | undefined>({
    id: 0,
    title: "",
    faculty: "",
    description: "",
    available: true,
    features: [""],
    image: "",
  })

  const getInfo = async () => {
    try {
      const responce = await axios(`http://localhost:8000/options/${id}/`, {
        method: "GET",
        // withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          // Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      })
      setInfo(responce.data)
    } catch (error) {
      setMock(true)
      let filteredGroups: cardInfoProps | undefined = OptionsMock.find(
        (group) => group.id == parseInt(id)
      )
      setInfo(filteredGroups)
      console.log("Ошибка при выполнении запроса:", error)
    }
  }

  const addOptionToApp = async (id: number) => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/options/${id}/add_to_application/`,
        {
          method: "POST",
          withCredentials: true,
        }
      )
      if (response.data) {
        dispatch(updateCart(response.data))
      }
      toast.success("Добавлен в заявку", {
        icon: "✅",
      })
      //🛩⚡✅✈
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  const addOptionToCart = (id: number) => {
    addOptionToApp(id)
  }

  return (
    <div className={styles.teacherinfo}>
      <div className={styles.teacherinfo__image}>
        {info && info.image ? (
          <img
            className={styles.teacherinfo__image_img}
            src={mock ? `../${info.image}` : info.image}
            alt="sssss"
          ></img>
        ) : (
          <img
            className={styles.teacherinfo__image_img}
            src={defTeacher}
            alt="aaa"
          ></img>
        )}
      </div>
      <div className={styles.teacherinfo__common}>
        <div className={styles.teacherinfo__common_text}>
          <div className={styles.teacherinfo__common_title}>
            {info && info.title}
          </div>
          <div className={styles.teacherinfo__common_subtitle}>
            {info && info.description}
          </div>
          <div className={styles.teacherinfo__common_subtitle}>
            {info && info.features}
          </div>
        </div>
          <div className={styles.teacherinfo__common_actions}>
            <Button onClick={() => addOptionToCart(Number(id))}>В заявку</Button>
          </div>
      </div>
    </div>
  )
}

export default TeacherInfo
