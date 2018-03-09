import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import app from './app';
import admin from './admin';
import login from './login';
import render from './render';
import setTemplate from './setTemplate';

const router = express.Router();

const manifestPath = path.join(process.cwd(), 'src/public/build/manifest.json');
const manifestJSON = fs.readFileSync(manifestPath, 'utf8');
const clientAssets = JSON.parse(manifestJSON);

const bundles = ['main.js', 'admin.js', 'login.js'];

const vendorJSBundles = Object.keys(clientAssets)
  .filter(file => !bundles.includes(file) && file.indexOf('.map') === -1)
  .map(file => clientAssets[file]);

const pipeline = [render, setTemplate];

const setAssets = entry => (req, res, next) => {
  res.locals.assets = {
    vendorJSBundles,
    mainJSBundle: clientAssets[entry],
  };

  next();
};

router.get('/admin', setAssets('admin.js'), admin, pipeline);
router.get('/login', setAssets('login.js'), login, pipeline);
router.get('*', setAssets('main.js'), app, pipeline);

export default router;
