import React from "react"
import TeacherEdit from "../../components/TeacherEdit/TeacherEdit"
import styles from "./teacheradminpanel.module.scss"

const TeacherAdminPanel = () => {
  return (
    <div className={styles["teacher-edit_page"]}>
      <TeacherEdit />
    </div>
  )
}

export default TeacherAdminPanel
