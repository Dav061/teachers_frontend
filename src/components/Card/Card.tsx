import React from "react";

import styles from "./card.module.scss";
// import defTeacher from "../../assets/icons/none.png";

import { cardInfoProps } from "../../types";
// import svg from "../../assets/react.svg"

const Card: React.FC<cardInfoProps> = ({ title, faculty, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        {image ? (
          <img className={styles.card__image_img} src={image} alt="aaa"></img>
        ) : (
          <img
            className={styles.card__image_img}
            // src={defTeacher}
            alt="sss"
          ></img>
        )}
      </div>
      <div className={styles.card__inner}>
        <div className={styles.card__inner_title}>{title}</div>
        <div className={styles.card__inner_subtitle}>{faculty}</div>
      </div>
    </div>
  );
};

export default Card;
