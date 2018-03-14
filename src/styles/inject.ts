import { injectGlobal } from 'emotion';
import themeUtils from 'styles/theme';

export default function inject() {
  return injectGlobal`
    body {
      background: ${themeUtils.color.background};
      color: ${themeUtils.color.dark};
      font-family: ${themeUtils.font.body};
      font-size: 1em;
      line-height: 1.5;
      text-rendering: optimizeLegibility;
    }

    iframe {
      max-width: 100%;
    }

    a {
      color: ${themeUtils.color.dark};

      &:hover, &:active {
        color: ${themeUtils.color.pink};
      }
    }

    blockquote {
      margin: 0 ${themeUtils.padding}px;
    }

    em {
      font-style: italic;
    }

    strong {
      font-weight: ${themeUtils.font.weight.bold};
    }

    sup {
      font-size: 10px;
      vertical-align: super;
    }

    sub {
      font-size: 10px;
      vertical-align: sub;
    }
  `;
}
