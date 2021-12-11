import React from "react";
import styles from "../styles/Loader.module.css";
export const Loader = ({ style }: { style?: any }) => {
  return (
    <div className={styles.container} style={style}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
