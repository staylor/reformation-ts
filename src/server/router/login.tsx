import * as React from 'react';
import { StaticRouter } from 'react-router';
import Login from 'routes/Login';

export default (req, res, next) => {
  const staticContext = {};

  const app = (
    <StaticRouter location={req.url} context={staticContext}>
      <Login />
    </StaticRouter>
  );

  res.locals.app = app;
  res.locals.staticContext = staticContext;

  next();
};
