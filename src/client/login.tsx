import React = require('react');
import ReactDOM = require('react-dom');
import Login from 'routes/Login';
import Base from './Base';

ReactDOM.hydrate(
  <Base>
    <Login />
  </Base>,
  document.getElementById('main')
);
