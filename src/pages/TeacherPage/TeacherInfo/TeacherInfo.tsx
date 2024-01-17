import React, { useEffect, useState } from "react";

import defTeacher from "../../../assets/icons/flight.png";

import styles from "./Teacherinfo.module.scss";

import { cardInfoProps } from "../../../types";
import { DOMEN } from "../../../consts";
import { OptionsMock } from "../../../consts";

type TeacherInfoProps = {
  id: string;
};

const TeacherInfo: React.FC<TeacherInfoProps> = ({ id }) => {
  const [mock, setMock] = useState(false);
  const [info, setInfo] = useState<cardInfoProps | undefined>({
    id: 0,
    title: "",
    faculty: "",
    description: "",
    available: true,
    features: [""],
    image: "",
  });

  useEffect(() => {
    fetch(`${DOMEN}/options/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const option = data;
        console.log(option);
        setInfo(option);
      })
      .catch((error) => {
        setMock(true);
        let filteredGroups: cardInfoProps | undefined = OptionsMock.find(
          (group) => group.id == parseInt(id)
        );
        setInfo(filteredGroups);
        console.log("Ошибка при выполнении запроса:", error);
      });
  }, []);

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
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
