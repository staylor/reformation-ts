import React = require('react');
import ReactDOM = require('react-dom');
import { hydrate } from 'emotion';
import { BrowserRouter } from 'react-router-dom';
import Login from 'routes/Login';

hydrate(window['__emotion']);

ReactDOM.hydrate(
  <BrowserRouter>
    <Login />
  </BrowserRouter>,
  document.getElementById('main')
);
