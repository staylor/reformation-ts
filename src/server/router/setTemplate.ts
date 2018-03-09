import template from '../template';

export default (req, res, next) => {
  const { html, assets } = res.locals;

  res.send(
    template({
      html,
      assets,
    })
  );
};
