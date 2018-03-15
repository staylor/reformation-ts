import * as React from 'react';
import { Request, Response, NextFunction } from 'express';
import Admin from 'routes/Admin';

export default (req: Request, res: Response, next: NextFunction) => {
  res.locals.tree = <Admin />;
  res.locals.stylesheets = ['/css/Draft.css'];

  next();
};
