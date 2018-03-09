import { Request, Response, NextFunction } from 'express';
import template from 'server/template';

export default (req: Request, res: Response, next: NextFunction) => {
  const { ids, css, html, assets, stylesheets, helmetContext } = res.locals;

  res.send(
    template({
      ids,
      css,
      html,
      assets,
      stylesheets,
      helmet: helmetContext.helmet,
    })
  );
};
