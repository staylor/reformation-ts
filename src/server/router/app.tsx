import * as React from 'react';
import { Request, Response, NextFunction } from 'express';
import App from 'routes/App';

export default (req: Request, res: Response, next: NextFunction) => {
  res.locals.tree = <App />;

  next();
};
