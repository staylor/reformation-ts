interface ServerTemplate {
  ids: string[];
  css: string;
  html: string;
  stylesheets?: string[];
  assets: {
    vendorJSBundles?: string[];
    mainJSBundle?: string;
  };
  helmet: any;
  locale: string;
  messages: any;
}

export default function template({
  ids = [],
  css = '',
  html = '',
  stylesheets = [],
  assets,
  helmet,
  locale = 'en',
  messages = {},
}: ServerTemplate): string {
  return `<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
${helmet.title.toString()}${helmet.script.toString()}${helmet.meta.toString()}${helmet.link.toString()}
${stylesheets
    .map(sheet => `<link rel="stylesheet" href="${sheet}" />`)
    .join('')}<style>${css}</style>
</head>
<body ${helmet.bodyAttributes.toString()}>
<script>window.__emotion = ${JSON.stringify(ids)}</script>
<script>window.__l10n = ${JSON.stringify({ locale, messages })}</script>
<main id="main">${html}</main>
${assets.vendorJSBundles.map(bundle => `<script defer src="${bundle}"></script>`).join('')}
${assets.mainJSBundle ? `<script defer src="${assets.mainJSBundle}"></script>` : ''}
</body>
</html>`;
}
