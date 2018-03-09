import { Request, Response, NextFunction } from 'express';
import { renderToString } from 'react-dom/server';

export default (req: Request, res: Response, next: NextFunction) => {
  const html = renderToString(res.locals.app);

  res.locals.html = html;

  next();
};
