import React = require('react');
import Helmet from 'react-helmet-async';

const Login = () => (
  <section>
    <Helmet titleTemplate={'%s - Reformation'}>
      <html lang="en" />
      <title>Login</title>
    </Helmet>
    <h1>Login</h1>
  </section>
);

export default Login;
