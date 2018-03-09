import React = require('react');
import ReactDOM = require('react-dom');
import { hydrate } from 'emotion';
import { BrowserRouter } from 'react-router-dom';
import Admin from 'routes/Admin';

hydrate(window['__emotion']);

ReactDOM.hydrate(
  <BrowserRouter>
    <Admin />
  </BrowserRouter>,
  document.getElementById('main')
);
