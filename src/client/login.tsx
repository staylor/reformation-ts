import React = require('react');
import ReactDOM = require('react-dom');
import { Route } from 'react-router-dom';
import Login from 'routes/Login';
import Base from './Base';

ReactDOM.hydrate(
  <Base>
    <Route path="/login/:action?" component={Login} />
  </Base>,
  document.getElementById('main')
);
