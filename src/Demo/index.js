import React, { render } from 'react';
import Container from './Container';

const styles = {
  display: 'flex',
  color: 'skyblue',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};
const App = (
  <div style={styles}>
    <h1>Hi there!!</h1>
    <h2>Let's play a game.</h2>
    <h3 style={{ color: 'black' }}>
      <span>Try to mantain the counter below 10 😎</span>
    </h3>
    <Container />
  </div>
);

render(<App />, document.getElementById('app'));
