import React = require('react');
import ReactDOM = require('react-dom');
import Admin from 'routes/Admin';
import Base from './Base';

ReactDOM.hydrate(
  <Base>
    <Admin />
  </Base>,
  document.getElementById('main')
);
