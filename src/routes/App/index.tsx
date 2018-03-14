import * as React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Helmet from 'react-helmet-async';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Post from './Post';
import Home from './Home';
import NotFound from './NotFound';

type AppProps = { children?: React.ReactNode };

const App: React.SFC = (props: AppProps & InjectedIntlProps) => {
  const { intl: { locale, messages } } = props;
  return (
    <section>
      <Helmet titleTemplate={'%s - Reformation'}>
        <html lang={locale} />
        <title>{messages.siteTitle}</title>
      </Helmet>
      <h1>{messages.siteTitle}</h1>
      <nav>
        <Link to="/">Home</Link> / <Link to="/post/ok">Post</Link> / <Link to="/error">Error</Link>
      </nav>
      <Switch>
        <Route path="/post/:slug" component={Post} />
        <Route exact path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </section>
  );
};

export default injectIntl(App);
