import * as React from 'react';
import { Request, Response, NextFunction } from 'express';
import { Route } from 'react-router-dom';
import Login from 'routes/Login';
import { getMessages } from 'l10n/utils';

export default (req: Request, res: Response, next: NextFunction) => {
  const locale = req.query.locale || 'en';
  const messages = getMessages(locale, 'login');

  res.locals.messages = messages;
  res.locals.tree = <Route path="/login/:action?" component={Login} />;

  next();
};
