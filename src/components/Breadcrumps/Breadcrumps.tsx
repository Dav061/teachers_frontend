import { Link, useLocation } from "react-router-dom"

import styles from "./breadcrumps.module.scss"

const Breadcrumps = () => {
  const location = useLocation()

  let currentLink = ""

  const crumps = location.pathname
    .split("/")
    .filter((crump) => crump !== "")
    .map((crump) => {
      currentLink += `/${crump}/`


      //Какой же бред!!!!!!!!!!!!!
      if (crump == "history") crump = "История"
      if (crump == "teachers_frontend") crump = "Преподаватели"
      if (crump == "cart") crump = "Корзина"
      if (crump == "auth") crump = "Авторизация"
      if (crump == "registration") crump = "Регистрация"
      if (crump == "application") crump = "Заказ"
      if (crump == "teachers-list") crump = "Список преподавателей"

      return (
        <div className={styles.crump} key={crump}>
          <Link to={currentLink}>{crump}</Link>
        </div>
      )
    })

  return (
    <div className={styles.breadcrumps}>
      <div className={styles.crump}>
        <Link to={"/"}>Главная</Link>
      </div>
      {crumps}
    </div>
  )
}

export default Breadcrumps
