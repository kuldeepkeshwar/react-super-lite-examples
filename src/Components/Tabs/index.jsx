import React from "react-super-lite";
import styles from "./styles.scss";


export class Tab extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }
  selectTab(active) {
    this.setState({ active });
  }
  render() {
    return <div >
        <div class={styles["headers"]}>
          {this.props.children.map((c, i) => (
            <div
              class={[
                styles["tab"],
                i === this.state.active ? styles["active"] : ""
              ].join(" ")}
              key={i}
              onClick={() => this.selectTab(i)}
            >
              <a>{c.props.title}</a>
            </div>
          ))}
        </div>
        <div class={styles["content"]}>
          {this.props.children[this.state.active]}
        </div>
      </div>;
  }
}
export default Tabs;
