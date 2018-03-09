import * as React from 'react';
import { StaticRouter } from 'react-router';
import App from 'routes/App';

export default (req, res, next) => {
  const staticContext = {};

  const app = (
    <StaticRouter location={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  );

  res.locals.app = app;
  res.locals.staticContext = staticContext;

  next();
};
