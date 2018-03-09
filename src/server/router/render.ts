import { Request, Response, NextFunction } from 'express';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';

export default (req: Request, res: Response, next: NextFunction) => {
  const { ids, css, html } = extractCritical(renderToString(res.locals.app));

  res.locals.ids = ids;
  res.locals.css = css;
  res.locals.html = html;

  next();
};
