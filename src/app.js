import React from './React';

const HelloComponent = props => <div>Hello {props.name || 'World!!'}</div>;
class App extends React.Component {
  render() {
    return (
      <div
        style={this.props.style}
        id="container"
        onClick={e => console.log(e)}
      >
        {this.props.children}
        <HelloComponent />
      </div>
    );
  }
}
export default App;
