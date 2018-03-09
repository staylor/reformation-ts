import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from 'routes/Login';

hydrate(
  <BrowserRouter>
    <Login />
  </BrowserRouter>,
  document.getElementById('main')
);
