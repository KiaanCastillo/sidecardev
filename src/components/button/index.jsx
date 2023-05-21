import styles from "./style.module.scss";

export const Button = ({ children, variant }) => {
  return <button className={styles.btn}>{children}</button>;
};
