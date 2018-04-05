import * as React from 'react';
import { Request, Response, NextFunction } from 'express';
import Admin from 'routes/Admin';
import { getMessages } from 'l10n/utils';

export default (req: Request, res: Response, next: NextFunction) => {
  const locale = req.query.locale || 'en';
  const messages = getMessages(locale, 'admin');

  res.locals.messages = messages;
  res.locals.tree = <Admin />;
  res.locals.stylesheets = ['/css/Draft.css'];

  next();
};
