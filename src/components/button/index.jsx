import styles from "./style.module.scss";

export const Button = ({
  children,
  variant = "",
  size = "small",
  className,
  ...props
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
