import React = require('react');
import ReactDOM = require('react-dom');
import { hydrate } from 'emotion';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import Login from 'routes/Login';

hydrate(window['__emotion']);

ReactDOM.hydrate(
  <HelmetProvider>
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('main')
);
