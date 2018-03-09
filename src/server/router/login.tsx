import * as React from 'react';
import { Request, Response, NextFunction } from 'express';
import Login from 'routes/Login';

export default (req: Request, res: Response, next: NextFunction) => {
  const app = <Login />;

  res.locals.app = app;

  next();
};
