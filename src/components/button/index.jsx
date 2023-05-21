import styles from "./style.module.scss";

export const Button = ({ children, variant = "", ...props }) => {
  return (
    <button className={`${styles.btn} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};
