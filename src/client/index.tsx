import React = require('react');
import ReactDOM = require('react-dom');
import { hydrate } from 'emotion';
import { BrowserRouter } from 'react-router-dom';
import App from 'routes/App';

hydrate(window['__emotion']);

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('main')
);
