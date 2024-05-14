import React from "react";
import styles from "./Input.module.css";

const Input = ({ type, id, label, error, onChange, onBlur }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        className={styles.input}
        id={id}
        name={id}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
