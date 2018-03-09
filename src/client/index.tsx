import React = require('react');
import ReactDOM = require('react-dom');
import { hydrate } from 'emotion';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from 'routes/App';

hydrate(window['__emotion']);

ReactDOM.hydrate(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('main')
);
