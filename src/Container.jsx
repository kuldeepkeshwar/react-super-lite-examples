import React from './React';
import Counter from './Counter';

const styles = {
  display: 'flex',
  height: '10rem',
  fontSize: '2rem',
  color: 'black',
  margin: '3rem',
  justifyContent: 'center',
  alignItems: 'center'
};
const FinalScreen = () => <div>You won !!!</div>;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 10
    };
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
  }
  plus() {
    this.setState({
      counter: this.state.counter + 1
    });
  }
  minus() {
    this.setState({
      counter: this.state.counter - 1
    });
  }
  render() {
    return (
      <div style={styles} id="conatiner">
        {this.state.counter > 11 ? (
          <FinalScreen />
        ) : (
          <Counter
            plus={this.plus}
            minus={this.minus}
            value={this.state.counter}
          />
        )}
      </div>
    );
  }
}
export default App;
