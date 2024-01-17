import React from "react";
import Button from "../Button/Button";
import { Response } from "../../types";
import styles from "./card.module.scss";
import defTeacher from "../../assets/icons/none.png";
import { RootState } from "../../store/store"
import { cardInfoProps } from "../../types";
import Cookies from "universal-cookie";
import axios from "axios";
import { updateCart } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
const cookies = new Cookies();
// import svg from "../../assets/react.svg"

const Card: React.FC<cardInfoProps> = ({
  id,
  title,
  faculty,
  image,
  onAddClick,
  // children
}) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        {image ? (
          <img className={styles.card__image_img} src={image} alt="aaa"></img>
        ) : (
          <img
            className={styles.card__image_img}
            src={defTeacher}
            alt="sss"
          ></img>
        )}
      </div>
      <div className={styles.card__inner}>
        <div className={styles.card__inner_title}>{title}</div>
        <div className={styles.card__inner_subtitle}>{faculty}</div>
        <div className={styles.card__inner_action}>
          <Button onClick={onAddClick}> В заявку</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
