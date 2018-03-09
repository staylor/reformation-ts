import 'dotenv/config';
import path = require('path');
import express = require('express');
import morgan = require('morgan');
import compression = require('compression');
import cookieParser = require('cookie-parser');
// inject global styles before any other component tree imports
import './injectStyles';
import router from './router';

const app = express();

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());

// Standard Apache combined log output.
// https://github.com/expressjs/morgan#combined
app.use(morgan('combined'));

const publicDir = path.join(process.cwd(), 'src/public/build');
// Setup the public directory so that we can server static assets.
app.use('/assets', express.static(publicDir));

app.use(cookieParser());

app.use(router);

const port = parseInt(process.env.SERVER_PORT, 10) || 3000;

app.listen(port, () => {
  console.log(`App server running on port ${port}...`);
});
