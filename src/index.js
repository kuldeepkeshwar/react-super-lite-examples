import React, { render } from './React';
import App from './app';

const styles = { color: 'skyblue' };
const linkStyles = { color: 'red', padding: '5px' };

render(
  <App style={styles}>
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
  </App>,
  document.getElementById('app')
);
