import React from 'react-super-lite';
import Counter from './../Components/Counter';
import Result from "./../Components/Result";
import Button from "./../Components/Button";

import styles from "./Game.scss";

const winCondition = 10;
const INTERVAL=200;
const STATE = {
  INIT: 'INIT',
  RUNNING: 'RUNNING',
  PAUSE: 'PAUSE',
  STOPPED: 'STOPPED'
};

const actionBtnStyle = {
  border: '1px black solid',
  background: 'white'
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: winCondition + 1,
      currentState: STATE.INIT
    };
    this.cancelId = null;
    this.minus = this.minus.bind(this);
    this.init = this.init.bind(this);
    this.resume = this.resume.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
  }
  updateCounter(counter) {
    this.setState({
      counter: counter
    });
    if (counter <= winCondition) {
      this.stop();
    }
  }
  minus() {
    this.updateCounter(this.state.counter - 1);
  }
  init() {
    this.setState({
      counter: winCondition + 1,
      currentState: STATE.INIT
    });
  }
  resume() {
    this.setState({
      currentState: STATE.RUNNING
    });
    this.cancelId = setInterval(() => {
      this.updateCounter(this.state.counter + 1);
    }, INTERVAL);
  }
  pause() {
    this.setState({
      currentState: STATE.PAUSE
    });
    this.cleanUp();
  }
  stop() {
    this.setState({
      currentState: STATE.STOPPED
    });
    this.cleanUp();
  }
  cleanUp() {
    this.cancelId && clearInterval(this.cancelId);
    this.cancelId = null;
  }
  componentWillUnmount() {
    this.cleanUp();
  }

  render() {
    return <div>
        <div class={styles["container"]}>
          {this.state.currentState === STATE.STOPPED ? <Result won={this.state.counter <= winCondition} reset={this.init} /> : <div>
              <div class={styles["action-bar"]}>
                {this.state.currentState === STATE.INIT || this.state.currentState === STATE.STOPPED ? <div>
                    <Button style={actionBtnStyle} onClick={this.resume}>
                      Start
                    </Button>
                  </div> : <div>
                    {this.state.currentState === STATE.RUNNING ? <Button style={actionBtnStyle} onClick={this.pause}>
                        <span class={styles["pause-btn"]}>|</span>
                        <span class={styles["pause-btn"]}>|</span>
                      </Button> : <Button style={actionBtnStyle} onClick={this.resume}>
                        ▶
                      </Button>}
                    <Button style={actionBtnStyle} onClick={this.stop}>
                      🛑
                    </Button>
                  </div>}
              </div>
              <Counter showBtns={this.state.currentState !== STATE.INIT} minus={this.minus} value={this.state.counter} />
            </div>}
        </div>
      </div>;
  }
}
export default Container;
