import { renderToString } from 'react-dom/server';

export default (req, res, next) => {
  const html = renderToString(res.locals.app);

  res.locals.html = html;

  next();
};
