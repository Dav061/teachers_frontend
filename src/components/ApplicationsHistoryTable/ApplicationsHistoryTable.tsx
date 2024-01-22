import React, { useEffect, useState } from "react"
import { useTable, Column } from "react-table"
import axios from "axios"
import { Response } from "../../types"
import { useDispatch, useSelector } from "react-redux"
import styles from "./ApplicationsHistoryTable.module.scss"
import Cookies from "universal-cookie"
import { Link } from "react-router-dom"
import { RootState } from "../../store/store"
import Teacher from "../../types"
import tick from "../../assets/icons/tick.png"
import close from "../../assets/icons/close.png"
import Input from "../Input/Input"
import {
  setAppDropdownValueId,
  setAppDropdownValueName,
  setAppInputValue,
  setAppEndDate,
  setAppStartDate,
} from "../../store/moderAppSlice"
import { applicationData } from "../../types"
import { STATUSES } from "../../consts"
import DropDown from "../Dropdown/Dropdown"
import { toast } from "react-toastify"
import moment from "moment"

const cookies = new Cookies()

const ApplicationsHistoryTable = () => {
  const [application, setApplication] = useState<applicationData[]>([])

  const isModerator = useSelector((state: RootState) => state.user.is_moderator)
  const dispatch = useDispatch()


  const selectedStatus = useSelector(
    (state: RootState) => state.moderApp.dropdown_value.id
  )
  const searchValue = useSelector(
    (state: RootState) => state.moderApp.input_value
  )
  const facultyValue = useSelector(
    (state: RootState) => state.moderApp.dropdown_value
  )
  const startDay = useSelector(
    (state: RootState) => state.moderApp.date_value.start_date
  )
  const endDay = useSelector(
    (state: RootState) => state.moderApp.date_value.end_date
  )

  const handleSelect = (selectedTeacher: Teacher) => {
    dispatch(setAppDropdownValueName(selectedTeacher.name))
    dispatch(setAppDropdownValueId(selectedTeacher.id))
  }

  const fetchAppsData = async () => {
    try {
      const params = `?start_day=${startDay}&end_day=${endDay}&status=${encodeURIComponent(
        facultyValue.id
      )}`

      axios.defaults.withCredentials = true
      const response: Response = await axios(
        `http://localhost:8000/applications/${params}`,
        {
          method: "GET",
          //  credentials: 'include',
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${cookies.get("access_token")}`,
          },
        }
      )
      if (response.status == 200) {
        const sortedApplications = response.data.sort(
          (a: { created_at: Date }, b: { created_at: Date }) => {
            const dateA = new Date(a.created_at).getTime()
            const dateB = new Date(b.created_at).getTime()
            return dateB - dateA // for descending order
          }
        )
        console.log(response.data)
        setApplication(sortedApplications)
      }
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const formApplication = async (application_id: number, status_id: number) => {
    try {
      const updatedData = {
        status: status_id,
      }

      const response: Response = await axios(
        `http://localhost:8000/applications/${application_id}/update_by_admin/`,
        {
          method: "PUT",
          data: updatedData,
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      )

      toast.success("Заявка оформлена", {
        icon: "✅",
      })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    // fetchAppsData()
    const intervalId = setInterval(() => {
      fetchAppsData()
    }, 1000)
    moment.locale("ru")
    return () => clearInterval(intervalId)
  }, [facultyValue, startDay, endDay])

  const data = application.filter((item) =>
    item.customer.email
      .toString()
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  )
  // const data = application

  const columns: Array<Column<{}>> = React.useMemo(
    () => [
      {
        Header: "№",
        accessor: "id",
      },
      {
        Header: "Статус",
        accessor: "status",
        Cell: ({ value }) => {
          let statusText = ""
          switch (value) {
            case 1:
              statusText = "Черновик"
              break
            case 2:
              statusText = "Удален"
              break
            case 3:
              statusText = "В работе"
              break
            case 4:
              statusText = "Завершен"
              break
            case 5:
              statusText = "Отклонен"
              break
            default:
              statusText = ""
          }
          return <span>{statusText}</span>
        },
      },
      {
        Header: "Дата создания",
        accessor: "created_at",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Дата формирования",
        accessor: "formed_at",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Дата завершения",
        accessor: "completed_at",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Аудитория",
        accessor: "audience",
      },
      {
        Header: "Заказчик",
        accessor: "customer.email",
      },
      {
        Header: "Информация",
        Cell: ({ cell }) => (
          <Link
            style={{
              textDecoration: "underline",
              color: "black",
            }}
            to={`/teachers_frontend/application/${cell.row.values.id}`}
          >
            Подробнее&gt;
          </Link>
          // <Button onClick={() => console.log("aaa")}>Открыть</Button>
        ),
      },
      {
        Header: "Действие",
        accessor: "action",
        Cell: ({ row }) => (
          <div className={styles.moder_action}>
            {row.values.status === 3 ? (
              <>
                <img
                  onClick={() => formApplication(row.values.id, 4)}
                  className={styles.moder_action__button}
                  src={tick}
                ></img>
                <img
                  onClick={() => formApplication(row.values.id, 5)}
                  className={styles.moder_action__button}
                  src={close}
                ></img>
              </>
            ) : null}
          </div>
        ),
      },
    ],
    []
  )

  const initialState = {
    hiddenColumns: isModerator ? [""] : ["customer.email", "action", "audience"],
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, initialState })

  

  return (
    <>
      {isModerator && (
        <div className={styles.filters}>
          <Input
            className={styles.input}
            searchValue={searchValue}
            onChangeValue={(i) => dispatch(setAppInputValue(i))}
          />
          <DropDown
            handleSelect={handleSelect}
            teachers={STATUSES}
            title={facultyValue.name}
          />
          <div style={{ fontSize: "30px", marginLeft:"80px" }}>с</div>
          <Input
            isDate={true}
            placeholder="DD-MM-YYYY"
            searchValue={startDay}
            onChangeValue={(i) => dispatch(setAppStartDate(i))}
          />
          <div style={{ fontSize: "30px" }}>до</div>
          <Input
            isDate={true}
            placeholder="DD-MM-YYYY"
            searchValue={endDay}
            onChangeValue={(i) => dispatch(setAppEndDate(i))}
          />
        </div>
      )}

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
    </>
  )
}

export default ApplicationsHistoryTable
