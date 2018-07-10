import React from './React';

const btnStyles = {
  outline: 'none',
  fontSize: '1rem',
  margin: '1rem',
  border: '0px',
  backgroundColor: 'skyblue',
  height: '2rem',
  width: '5rem'
};
const plusBtnStyles = Object.assign({}, btnStyles, {
  backgroundColor: 'skyblue'
});
const minusBtnStyles = Object.assign({}, btnStyles, {
  backgroundColor: 'rgb(236, 95, 103)'
});
class Counter extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log('got new props', nextProps);
  }
  render() {
    const props = this.props;
    return (
      <div id="counter">
        <button onClick={props.minus} style={minusBtnStyles}>
          -
        </button>
        Counter: {props.value > 20 ? props.value : <span>{props.value}</span>}
        <button onClick={props.plus} style={plusBtnStyles}>
          +
        </button>
      </div>
    );
  }
}
export default Counter;
