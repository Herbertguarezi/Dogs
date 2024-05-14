import React from "react";
import styles from "./Button.module.css";
import { element } from "prop-types";

const Button = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
