import 'dotenv/config';
import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
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

const port = parseInt(process.env.SERVER_PORT, 10);

app.listen(port, () => {
  console.log(`App server running on port ${port}...`);
});
