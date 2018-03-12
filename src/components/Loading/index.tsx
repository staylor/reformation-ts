import React = require('react');
import { Container, Wrap, bounce1, bounce2, LoadingProps } from './styled';

export default function Loading(props: LoadingProps) {
  return (
    <Container {...props}>
      <Wrap {...props}>
        <div className={bounce1} />
        <div className={bounce2} />
      </Wrap>
    </Container>
  );
}
