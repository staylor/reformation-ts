import React = require('react');
const { Fragment } = React;
import Message from 'components/Message';

const NotFound = () => (
  <Fragment>
    <h1>Error</h1>
    <Message text="This page does not exist." />
  </Fragment>
);

export default NotFound;
