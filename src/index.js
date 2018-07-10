import React, { render } from './React';
import Container from './Container';

const styles = { color: 'skyblue' };
const linkStyles = { color: 'red', padding: '5px' };
const App = (
  <div style={styles}>
    <h1>Hello Parcel!</h1>
    <div>
      Look
      <a
        class="link"
        style={linkStyles}
        href="https://parceljs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
      for more info about Parcel.
    </div>
    <Container />
  </div>
);

render(<App />, document.getElementById('app'));
