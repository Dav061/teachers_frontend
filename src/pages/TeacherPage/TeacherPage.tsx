import TeacherInfo from "./TeacherInfo/TeacherInfo";

import styles from "./teacherpage.module.scss";
import { useParams } from "react-router-dom";

const TeacherPage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  return (
    <div className={styles.teacherpage}>
      <div className={styles.container}>
        <TeacherInfo id={id} />
      </div>
    </div>
  );
};

export default TeacherPage;
