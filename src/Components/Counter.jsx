import React from 'react-super-lite';

import Button from './Button';
const btnStyles = {
  background: 'white'
};
class Counter extends React.Component {
  render() {
    const props = this.props;
    return (
      <div>
        Counter: <span>{props.value}</span>
        {props.showBtns ? (
          <Button onClick={props.minus} style={btnStyles}>
            🔥🎮🔥
          </Button>
        ) : null}
      </div>
    );
  }
}
export default Counter;
