interface Template {
  ids: string[];
  css: string;
  html: string;
  stylesheets?: string[];
  assets: {
    vendorJSBundles?: string[];
    mainJSBundle?: string;
  };
}

export default function template({
  ids = [],
  css = '',
  html = '',
  stylesheets = [],
  assets,
}: Template): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
${stylesheets.map(sheet => `<link rel="stylesheet" href="${sheet}" />`).join('')}
<style>${css}</style>
</head>
<body>
<script>window.__emotion = ${JSON.stringify(ids)}</script>
<main id="main">${html}</main>
${assets.vendorJSBundles.map(bundle => `<script defer src="${bundle}"></script>`).join('')}
${assets.mainJSBundle ? `<script defer src="${assets.mainJSBundle}"></script>` : ''}
</body>
</html>`;
}
