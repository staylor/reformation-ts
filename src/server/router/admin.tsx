import * as React from 'react';
import { Request, Response, NextFunction } from 'express';
import Admin from 'routes/Admin';

export default (req: Request, res: Response, next: NextFunction) => {
  const app = <Admin />;

  res.locals.app = app;
  res.locals.stylesheets = ['/css/Draft.css'];

  next();
};
