import * as React from 'react';
import { renderToString } from 'react-dom/server';

const Hello = () => <h1>Hello World</h1>;

const html = renderToString(<Hello />);

console.log(html);
