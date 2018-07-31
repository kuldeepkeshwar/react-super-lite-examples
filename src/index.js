import React, { render } from 'react-super-lite';
import Game from "./Containers/Game";
import AutoSuggest from "./Containers/AutoSuggest";

import Table from "./Containers/Table";
import Tabs, {Tab} from './Components/Tabs';
import styles from "./styles.scss";

const App = () => (
  <div>
    <Tabs>
      <Tab title="Game">
        <div class={styles["container"]} >
        <h1>Hi there!!</h1>
        <h2>Let's play a game.</h2>
        <h3 key="sample-key" style={{ color: "black" }}>
          <span>Try to mantain the counter below 10 😎</span>
        </h3>
        <Game /></div>
      </Tab>
      <Tab title="Table">
        <div class={styles["container"]} ><Table /></div>
      </Tab>
      <Tab title="AutoSuggest">
        <div class={styles["container"]} ><AutoSuggest /></div>
      </Tab>
    </Tabs>
  </div>
);
// const App = () => (
//   <div class={styles["container"]}>
//     <Table />
//   </div>
// );

render(<App />, document.getElementById('app'));
