import styles from "./imfoblock.module.scss";

export const InfoBlock = () => {
  return (
    <div className={styles.infoblock}>
      <div className={styles.container}>
        <div className={styles.infoblock__title}>
          <div className={styles.infoblock__title_text}>Наш коллектив</div>
        </div>
        <div className={styles.infoblock__subtitle}>
        Информация о персональном составе педагогических работников с указанием учёной степени, 
        занимаемой должности, стажа и места работы, в том числе фамилию, имя, отчество работника.
        </div>
      </div>
    </div>
  );
};

export default InfoBlock;
