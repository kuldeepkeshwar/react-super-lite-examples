import React from "react-super-lite";
import Button from "./../Components/Button";
import styles from "./Table.scss";

const INTERVAL = 100;
function arrayGenerator(length) {
  return Array.apply(null, { length: length }).map(Number.call, Number);
}
function randomNumber() {
  return Math.floor(Math.random() * 256);
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
}
class ListItem extends React.Component {
  shouldComponentUpdate(nextProps,nextState){
    return this.props.text!==nextProps.text;
  }
  render() {
    const { text } = this.props;
    const style = {
      background: `rgba(${randomNumber()}, ${randomNumber()}, ${randomNumber()}, ${Math.random()})`
    };
    return (
      <div style={style} class={styles["item"]}>
        {text}
      </div>
    );
  }
}
class Table extends React.Component {
  render() {
    return (
      <div class={styles["table-row"]}>
        {this.props.items.map(i => {
          return <ListItem key={i + 1} text={i + 1} />;
        })}
      </div>
    );
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancelId: null, data: arrayGenerator(props.count) };
    this.shuffle = this.shuffle.bind(this);
    this.resume = this.resume.bind(this);
    this.stop = this.stop.bind(this);
  }

  resume() {
    const cancelId = setInterval(() => {
      this.shuffle();
    }, INTERVAL);
    this.setState({ cancelId });
  }
  stop() {
    this.cleanUp();
  }
  cleanUp() {
    this.state.cancelId && clearInterval(this.state.cancelId);
    this.setState({ cancelId: null });
  }
  componentWillReceiveProps(nextProps){
    this.setState({ data: arrayGenerator(nextProps.count) });
  }
  componentWillUnmount() {
    this.cleanUp();
  }
  shuffle() {
    const data = [...this.state.data];
    shuffle(data);
    this.setState({ data });
  }
  render() {
    return (
      <div class={styles["container"]}>
        <Button onClick={this.state.cancelId ? this.stop : this.resume}>
          {this.state.cancelId ? "Stop" : "Start"}
        </Button>
        <Table items={this.state.data} />
      </div>
    );
  }
}

export default Container;
