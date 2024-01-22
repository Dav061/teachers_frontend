import axios from "axios"
import React, { useEffect, useState } from "react"
import { useTable, Column } from "react-table"
import teacherData from "../../types"
import { Response } from "../../types"
import styles from "./teacherstable.module.scss"
import Button from "../Button/Button"
import deleteIcom from "../../assets/icons/delete.png"
import editIcon from "../../assets/icons/edit.png"
import { Link } from "react-router-dom"
import addicon from '../../assets/icons/btn_plus.png'

const TeachersTable = () => {
  const [teachers, setTeachers] = useState<teacherData[]>([])

  const fetchTeachers = async () => {
    try {
      axios.defaults.withCredentials = true
      const response: Response = await axios(`http://localhost:8000/teachers/?status=3`, {
        method: "GET",
        //   credentials: 'include',
        withCredentials: true,
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8",
        //     Authorization: `Bearer ${cookies.get("access_token")}`,
        //   },
      })
      if (response.status == 200) {
        setTeachers(response.data.teachers)
      }
      console.log(response.data.teachers)
    } catch (e) {
      console.log(e)
    }
  }

  const changeStatus = async (id: number, action: number) => {
    try {
      const url =
        action == 1
          ? `http://127.0.0.1:8000/teachers/${id}/delete/`
          : `http://127.0.0.1:8000/teachers/${id}/put/`

      const method = action == 1 ? "PUT" : "PUT"
      const updatedData = {
        available: 1,
      }
      const response: Response = await axios(url, {
        method: method,
        withCredentials: true,
        data: updatedData,
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8",
        //   Authorization: Bearer ${cookies.get("access_token")},
        // },
      })

      console.log(response.data)
      fetchTeachers()
    } catch (e) {
      console.log(e)
    }
  }

  const columns: Array<Column<{}>> = React.useMemo(
    () => [
      {
        Header: "№",
        accessor: "id",
      },
      {
        Header: "Название",
        accessor: "title",
      },
      {
        Header: "Описание",
        accessor: "description",
      },
      {
        Header: "Статус",
        accessor: "available",
        Cell: ({ value }) => {
          let status = ""
          value == true ? (status = "Доступен") : (status = "Не доступен")
          return <span>{status}</span>
        },
      },
      {
        Header: "Действие",
        accessor: "action",
        Cell: ({ row }) => (
          <div className={styles.moder_action}>
            <>
              <Link
                to={`/teachers_frontend/teachers-list/${row.values.id}`}
              >
                <img
                  // onClick={() => formApplication(row.values.id, 4)}
                  className={styles.moder_action__button}
                  src={editIcon}
                ></img>
              </Link>

              <img
                onClick={() => changeStatus(row.values.id, row.values.available)}
                className={styles.moder_action__button}
                src={row.values.available == 1 ? deleteIcom : addicon}
              ></img>
            </>
          </div>
        ),
      },
      {
        Header: "Изображение",
        accessor: "image",
        Cell: ({ value }) => {
          return <img style={{ width: 100 }} alt="aaa" src={value}></img>
        },
      },
      //   {
      //     Header: "Дата завершения",
      //     accessor: "completed_at",
      //     Cell: ({ value }) => (
      //       <span>
      //         {value ? moment(value).format("DD.MM.YYYY HH:mm") : "пока пусто"}
      //       </span>
      //     ),
      //   },
      //   {
      //     Header: "Заказчик",
      //     accessor: "customer",
      //   },
      //   {
      //     Header: "Информация",
      //     Cell: ({ cell }) => (
      //       <Link
      //         style={{
      //           textDecoration: "underline",
      //           color: "black",
      //         }}
      //         to={`/teachers_frontend/application/${cell.row.values.id}`}
      //       >
      //         Подробнее&gt;
      //       </Link>
      //       // <Button onClick={() => console.log("aaa")}>Открыть</Button>
      //     ),
      //   },
    ],
    []
  )
  useEffect(() => {
    fetchTeachers()
  }, [])

  const data = teachers

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <>
      <div className={styles.content}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.addbutton}>
        <Link to={`/teachers_frontend/teachers-list/0`}>
          <Button>Добавить нового преподавателя</Button>
        </Link>
      </div>
    </>
  )
}

export default TeachersTable
