import React = require('react');
import ReactDOM = require('react-dom');
import { hydrate } from 'emotion';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import Admin from 'routes/Admin';

hydrate(window['__emotion']);

ReactDOM.hydrate(
  <HelmetProvider>
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('main')
);
