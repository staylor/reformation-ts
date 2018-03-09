import * as React from 'react';
import { StaticRouter } from 'react-router';
import { Request, Response, NextFunction } from 'express';
import Admin from 'routes/Admin';

export default (req: Request, res: Response, next: NextFunction) => {
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
