import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import InfoBlock from "../../components/InfoBlock/InfoBlock";
import Card from "../../components/Card/Card";
import DropDown from "../../components/Dropdown/Dropdown";
// import SliderFilter from "../../components/Slider/Slider";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Skeleton from "../../components/Skeleton/Skeleton";

import styles from "./mainpage.module.scss";

import Teacher from "../../types";
import { cardInfoProps } from "../../types";
import { DOMEN, FACULTY} from "../../consts";
import { TeachersMock } from "../../consts";

const MainPage = () => {
  const [items, setItems] = useState<cardInfoProps[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
//   const [alphabetValues, setAlphabetValues] = useState(['a', 'z']);
  const [facultyValue, setFacultyValue] = useState("Любой факультет");

//   const handleSliderChange = (values: number[]) => {
//     setSliderValues(values);
//   };

  const handleDropDownChange = (selectedTeacher: Teacher) => {
    setFacultyValue(selectedTeacher.name);
  };

  useEffect(() => {
    const params = searchValue
      ? `?search=${encodeURIComponent(searchValue)}&faculty=${encodeURIComponent(facultyValue)}` 
      : `?faculty=${encodeURIComponent(facultyValue)}`;
    
    fetch(`${DOMEN}/teachers/${params}`) //!!!!!!!!!!!!!!!
      .then((response) => response.json())
      .then((data) => {
        const teachers = data.teachers;
        setItems(teachers);
        setIsLoading(false);
      })
      .catch(() => {
        createMock();
        setIsLoading(false);
      });
  }, [searchValue, facultyValue]);

  const createMock = () => {
    let filteredTeachers: cardInfoProps[] = TeachersMock.filter(
      (teacher) => teacher.available == true
    );

    if (searchValue) {
      filteredTeachers = filteredTeachers.filter((teacher) =>
        teacher.title.includes(searchValue)
      );
    }

    // if (sliderValues) {
    //   filteredTeachers = filteredTeachers.filter(
    //     (teacher) =>
    //       teacher.price > sliderValues[0] && teacher.price < sliderValues[1]
    //   );
    // }

    if (facultyValue != "Любой факультет") {
      filteredTeachers = filteredTeachers.filter(
        (teacher) => teacher.faculty == facultyValue
      );
    }
    setItems(filteredTeachers);
  };

  return (
    <div className={styles.mainpage}>
      <div className={styles.container}>
        <InfoBlock />
        <div className={styles.mainpage__actions}>
          <div className={styles.mainpage__input}>
            <Input onChangeValue={(i) => setSearchValue(i)} />
            <Button>Поиск</Button>
          </div>
          <div className={styles.mainpage__filters}>
            <DropDown
              onChangeValue={handleDropDownChange}
              teachers={FACULTY}
              defaultTitle="Любой факультет"
            />
            {/* <SliderFilter
              onChangeValues={handleSliderChange}
              minimum={0}
              maximum={10000}
              title="Цена"
            /> */}
          </div>
        </div>

        <div className={styles.mainpage__inner}>
        {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((item: cardInfoProps) => (
                <Link
                  to={`/teachers_frontend/${item.id}`}
                  key={item.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card key={item.id} {...item} />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
