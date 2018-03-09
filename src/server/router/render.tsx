import React = require('react');
import { Request, Response, NextFunction } from 'express';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';

export default (req: Request, res: Response, next: NextFunction) => {
  const context = {};
  const staticContext = {};

  const { ids, css, html } = extractCritical(
    renderToString(
      <HelmetProvider context={context}>
        <StaticRouter location={req.url} context={staticContext}>
          {res.locals.app}
        </StaticRouter>
      </HelmetProvider>
    )
  );

  res.locals.ids = ids;
  res.locals.css = css;
  res.locals.html = html;
  res.locals.staticContext = staticContext;
  res.locals.helmetContext = context;

  next();
};
