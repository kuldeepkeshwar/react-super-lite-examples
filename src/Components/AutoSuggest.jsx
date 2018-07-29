import React from "react-super-lite";
import styles from './AutoSuggest.scss';


function isValidCharKey(e){

    const keycode = e.keyCode;

    const valid = (keycode > 47 && keycode < 58) || keycode == 32 || keycode == 13 || keycode == 8 || (keycode > 64 && keycode < 91) || (keycode > 95 && keycode < 112) || (keycode > 185 && keycode < 193) || (keycode > 218 && keycode < 223);

    return valid;
}
class AutoSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handleKeyUp(e) {
    if(isValidCharKey(e)){
      const value = e.target.value;
      this.props.onChange(value);
    }
  }
  render() {
    const { options, value } = this.props;
    return <div class={options.length ? styles["container"] : ""}>
        <div class={options.length ? styles["label-container"] : styles["container"]}>
          <label>Search Users:</label>
          <input class={styles["input"]} type="text" value={value} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
        </div>
        <div class={styles["list-container"]}>
          {options.length ? <div class={styles["list"]}>
              {options.map((o, i) => {
                return <div id={o.id} key={i} class={styles["list-item"]}>
                    {o.name}
                  </div>;
              })}
            </div> : null}
        </div>
      </div>;
  }
}
export default AutoSuggest;
