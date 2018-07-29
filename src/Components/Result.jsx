import React from 'react-super-lite';
import styles from "./Result.scss";
import Button from './Button';
const btnStyle = {
  background: '##227a9e',
  color: 'white'
};
export default ({ reset, won }) => (
  <div class={styles["container"]}>
    {won ? <div>You won 🌟💰🏆🌟</div> : <div>You lost ☹</div>}
    <Button style={btnStyle} onClick={reset}>
      Play Again
    </Button>
  </div>
);
