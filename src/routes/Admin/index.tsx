import React = require('react');
import Helmet from 'react-helmet-async';

const Admin = () => (
  <section>
    <Helmet titleTemplate={'%s - Reformation'}>
      <html lang="en" />
      <title>Admin</title>
    </Helmet>
    <h1>Admin</h1>
  </section>
);

export default Admin;
