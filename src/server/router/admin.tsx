import * as React from 'react';
import { StaticRouter } from 'react-router';
import Admin from 'routes/Admin';

export default (req, res, next) => {
  const staticContext = {};

  const app = (
    <StaticRouter location={req.url} context={staticContext}>
      <Admin />
    </StaticRouter>
  );

  res.locals.app = app;
  res.locals.staticContext = staticContext;

  next();
};
