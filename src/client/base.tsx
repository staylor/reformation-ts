import React = require('react');
const { Fragment } = React;
import { hydrate } from 'emotion';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import enLocaleData = require('react-intl/locale-data/en');
import esLocaleData = require('react-intl/locale-data/es');

export default function Base({ children }) {
  const locale = window['__l10n'].locale;
  let localeData;
  if (locale === 'es') {
    localeData = esLocaleData;
  } else {
    localeData = enLocaleData;
  }

  addLocaleData(localeData);

  hydrate(window['__emotion']);

  return (
    <IntlProvider {...window['__l10n']} textComponent={Fragment}>
      <HelmetProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </HelmetProvider>
    </IntlProvider>
  );
}
