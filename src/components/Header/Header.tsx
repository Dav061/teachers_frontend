import logoPNG from "../../assets/icons/logo.png";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__logo}>
          <Link to={""} style={{ textDecoration: "none", color: "black" }}>
            <div>Teachers</div>
          </Link>
        </div>

        <div className={styles.header__profile}>
          <img src={logoPNG} alt="Logo" width={300} />
        </div>
      </div>
    </div>
  );
};

export default Header;
