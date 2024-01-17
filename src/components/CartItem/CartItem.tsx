import React, { useState } from "react"
import btnMinus from "../../assets/icons/btn_minus.svg"
import btnPlus from "../../assets/icons/btn_plus.svg"
import btnDel from "../../assets/icons/btn_delete.svg"
import mock from "../../assets/icons/user.svg"
import { useDispatch, useSelector } from "react-redux"
import styles from "./CartItem.module.scss"
import Cookies from "universal-cookie"
import { cartItemProps } from "../../types"
import axios from "axios"
import { RootState } from "../../store/store"

const cookies = new Cookies()
const CartItem: React.FC<cartItemProps> = ({
  id,
  title,
  faculty,
  image,
  onDelete,
  onAmountUpdate,
  updateAllow,
}) => {
  const handleItemRemove = () => {
    onDelete(id)
  }

  return (
    <div className={styles.cart__item}>
      <div className={styles["cart__item-img"]}>
        <img src={image} alt="option" />
      </div>
      <div className={styles["cart__item-info"]}>
        <h3>{title}</h3>
        <p>{faculty}</p>
      </div>
      {updateAllow && (
        <div onClick={handleItemRemove} className={styles["cart__item-remove"]}>
          <img src={btnDel}></img>
        </div>
      )}
    </div>
  )
}

export default CartItem
