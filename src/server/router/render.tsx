import React = require('react');
const { Fragment } = React;
import { Request, Response, NextFunction } from 'express';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { getMessages } from 'l10n/utils';

export default (req: Request, res: Response, next: NextFunction) => {
  const helmetContext = {};
  const staticContext = {};

  const locale = req.query.locale || 'en';
  let messages = getMessages(locale);
  if (res.locals.messages) {
    messages = Object.assign({}, messages, res.locals.messages);
  }

  const { ids, css, html } = extractCritical(
    renderToString(
      <IntlProvider {...{ locale, messages }} textComponent={Fragment}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={req.url} context={staticContext}>
            {res.locals.tree}
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
  res.locals.helmetContext = helmetContext;

  next();
};
