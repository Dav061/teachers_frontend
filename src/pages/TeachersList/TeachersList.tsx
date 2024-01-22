import React from "react"
import TeachersTable from "../../components/TeachersTable/TeachersTable"
import styles from "./teacherslist.module.scss"
const TeachersList = () => {
  return (
    <div className={styles.teacherslist_page}>
      <TeachersTable />
    </div>
  )
}

export default TeachersList
