import { Dropdown } from "react-bootstrap";

import styles from "./dropdown.module.scss";
import { useState } from "react";

import Teacher from "../../types";

export type DropDownProps = {
  teachers: Teacher[];
  defaultTitle: string;
  onChangeValue: (selectedTeacher: Teacher) => void; // Добавленный проп
};

const DropDown: React.FC<DropDownProps> = ({
  teachers,
  defaultTitle,
  onChangeValue,
}) => {
  const [title, setTitle] = useState<Teacher>(teachers[0]);

  const handleSelect = (selectedTeacher: Teacher) => {
    setTitle(selectedTeacher);
    onChangeValue(selectedTeacher);
  };

  return (
    <Dropdown className={styles.dropdown}>
      <Dropdown.Toggle className={styles.dropdown__toggle}>
        {title ? title.name : defaultTitle}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdown__menu}>
        {teachers.map((teacher) => (
          <Dropdown.Item onClick={() => handleSelect(teacher)} key={teacher.id}>
            {teacher.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
