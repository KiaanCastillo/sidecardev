import styles from "./style.module.scss";

export const Button = ({
  children,
  variant = "",
  size = "small",
  ...props
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
