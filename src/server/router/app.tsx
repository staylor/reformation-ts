import * as React from 'react';
import { StaticRouter } from 'react-router';
import { Request, Response, NextFunction } from 'express';
import App from 'routes/App';

export default (req: Request, res: Response, next: NextFunction) => {
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
