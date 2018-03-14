import { Request, Response, NextFunction } from 'express';
import template from 'server/template';

export default (req: Request, res: Response, next: NextFunction) => {
  const { ids, css, html, assets, stylesheets, helmetContext, locale, messages } = res.locals;

  res.send(
    template({
      ids,
      css,
      html,
      assets,
      stylesheets,
      locale,
      messages,
      helmet: helmetContext.helmet,
    })
  );
};
