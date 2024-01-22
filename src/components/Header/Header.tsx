import cartSvg from "../../assets/icons/bag-2.svg"
import userSvg from "../../assets/icons/user.svg"
import hisSvg from "../../assets/icons/history2.svg"
import optList from "../../assets/icons/teachers.png"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion"
import Cookies from "universal-cookie";
import styles from "./header.module.scss"
import { Link } from "react-router-dom"
import ProfileInfo from "../ProfileInfo/ProfileInfo"
import { RootState } from "../../store/store"
import { cleanUser } from "../../store/userSlice"
import { toast } from "react-toastify"
import { resetMainFilters } from "../../store/filtersSlices"
import { resetModerFilters } from "../../store/moderAppSlice"
const cookies = new Cookies();
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response: Response = await axios(`http://localhost:8000/logout/`, {
        method: "POST",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      });
      cookies.remove("access_token", { path: "/" });
      dispatch(cleanUser());
      dispatch(resetMainFilters());
      dispatch(resetModerFilters());
      toast.success("Выход выполнен успешно", {
        icon: "✅",
      });

      navigate("/teachers_frontend");
    } catch {
      console.log("kaka");
    }
  };
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation()
  // const cart = useSelector((state: RootState) => state.cart.items.length)
  const currentCart = useSelector((state: RootState) => state.user.current_cart)
  const [v, sV] = useState(false)
  const isAuth = useSelector((state: RootState) => state.user.is_authenticated)
  const isModerator = useSelector((state: RootState) => state.user.is_moderator)
  const isCartEmpty = useSelector((state: RootState) => state.user.current_cart)
  // useEffect(() => {
  //   console.log("header render")
  // }, [cart])
  const handleSubmit = async () => {
    await logout();
  };
  // const user = useSelector((state: RootState) => state.user);
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__logo}>
          <Link to={""} style={{ textDecoration: "none", color: "black" }}>
            <div>Преподаватели</div>
          </Link>
        </div>

        <div className={styles.header__profile}>
          {isAuth && (
            <Link
              style={{ height: 27 }}
              to="/teachers_frontend/history"
            >
              <div className={styles.cart}>
                <img style={{ width: 27 }} src={hisSvg} alt="History" />
              </div>
            </Link>
          )}

          {location.pathname === "/teachers_frontend/" &&
            isAuth &&
            !isModerator &&
            (isCartEmpty != -1 ? (
              <Link to={`/teachers_frontend/application/${currentCart}`}>
                <div className={styles.cart}>
                  <img src={cartSvg} alt="Cart" />
                  {/* <div className={styles.cart_badge}>{cart}</div> */}
                </div>
              </Link>
            ) : (
              <div className={styles.cart}>
                <img src={cartSvg} alt="Cart" style={{ opacity: "0.5" }} />
                {/* <div>{cart}</div> */}
              </div>
            ))}
          {isModerator && (
            <Link to="/teachers_frontend/teachers-list">
              <div className={styles.cart}>
                <img style={{ width: 30 }} src={optList} alt="Cart" />
              </div>
            </Link>
          )}
          <div>{user.user_email}</div>
          {!user.is_authenticated ?
          <Link to="/teachers_frontend/auth">
          <span className={styles.menu__login}>авторизоваться</span>
        </Link>:<div style={{cursor:"pointer", textDecoration:"underline"}} onClick={handleSubmit}>Выйти</div>
          }
          

          {/* <div
            className={styles.user}
            onClick={() => {
              sV(!v)
            }}
          >
            <img src={userSvg} alt="User" style={{ cursor: "pointer" }} />
            <AnimatePresence>
              {v && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  className={styles.profileInfoContainer}
                >
                  <ProfileInfo />
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Header
