import React = require('react');
const { Fragment } = React;
import ReactDOM = require('react-dom');
import { hydrate } from 'emotion';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';

export default function Base({ children }) {
  const locale = window['__l10n'].locale;
  const localeData = require(`react-intl/locale-data/${locale}`);
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
