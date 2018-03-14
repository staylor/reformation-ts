import React = require('react');
import ReactDOM = require('react-dom');
import App from 'routes/App';
import Base from './Base';

ReactDOM.hydrate(
  <Base>
    <App />
  </Base>,
  document.getElementById('main')
);
