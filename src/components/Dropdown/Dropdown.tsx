import { Dropdown } from "react-bootstrap"
import { useDispatch } from "react-redux"
import styles from "./dropdown.module.scss"
import {
  setDropdownValueId,
  setDropdownValueName,
} from "../../store/filtersSlices"
import Teacher from "../../types"

export type DropDownProps = {
  teachers: Teacher[]
  title: string
  handleSelect: (value: Teacher) => void
}

const DropDown: React.FC<DropDownProps> = ({
  teachers,
  title,
  handleSelect,
}) => {
  return (
    <Dropdown className={styles.dropdown}>
      <Dropdown.Toggle className={styles.dropdown__toggle}>
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdown__menu}>
        {teachers.map((teacher) => (
          <Dropdown.Item onClick={() => handleSelect(teacher)} key={teacher.id}>
            {teacher.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropDown
