import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Admin from 'routes/Admin';

hydrate(
  <BrowserRouter>
    <Admin />
  </BrowserRouter>,
  document.getElementById('main')
);
