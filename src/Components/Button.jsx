import React from 'react-super-lite';
import styles from "./Button.scss";

export default props => {
  const { style, children, ...rest } = props;
  return <button class={styles["btn"]} style={style} {...rest}>
      {children}
    </button>;
};
