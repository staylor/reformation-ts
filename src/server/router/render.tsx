import React = require('react');
const { Fragment } = React;
import { Request, Response, NextFunction } from 'express';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';

export default (req: Request, res: Response, next: NextFunction) => {
  const context = {};
  const staticContext = {};

  const locale = req.query.locale || 'en';
  const messages = require(`l10n/${locale}.json`);

  const { ids, css, html } = extractCritical(
    renderToString(
      <IntlProvider {...{ locale, messages }} textComponent={Fragment}>
        <HelmetProvider context={context}>
          <StaticRouter location={req.url} context={staticContext}>
            {res.locals.app}
          </StaticRouter>
        </HelmetProvider>
      </IntlProvider>
    )
  );

  res.locals.locale = locale;
  res.locals.messages = messages;
  res.locals.ids = ids;
  res.locals.css = css;
  res.locals.html = html;
  res.locals.staticContext = staticContext;
  res.locals.helmetContext = context;

  next();
};
