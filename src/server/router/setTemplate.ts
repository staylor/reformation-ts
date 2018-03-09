import { Request, Response, NextFunction } from 'express';
import template from 'server/template';

export default (req: Request, res: Response, next: NextFunction) => {
  const { html, assets } = res.locals;

  res.send(
    template({
      html,
      assets,
    })
  );
};
