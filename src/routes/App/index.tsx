import React = require('react');
import { Switch, Route, Link } from 'react-router-dom';
import Helmet from 'react-helmet-async';
import Post from './Post';
import Home from './Home';
import NotFound from './NotFound';

const App = () => (
  <section>
    <Helmet titleTemplate={'%s - Reformation'}>
      <html lang="en" />
      <title>Example App</title>
    </Helmet>
    <h1>App</h1>
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

export default App;
