import fs = require('fs');
import path = require('path');
import { Request, Response, NextFunction } from 'express';

const manifestPath = path.join(process.cwd(), 'src/public/build/manifest.json');
const manifestJSON = fs.readFileSync(manifestPath, 'utf8');
const clientAssets = JSON.parse(manifestJSON);

const bundles = ['main.js', 'admin.js', 'login.js'];

const vendorJSBundles = Object.keys(clientAssets)
  .filter(file => bundles.indexOf(file) === -1 && file.indexOf('.map') === -1)
  .map(file => clientAssets[file]);

const setAssets = (entry: string) => (req: Request, res: Response, next: NextFunction) => {
  res.locals.assets = {
    vendorJSBundles,
    mainJSBundle: clientAssets[entry],
  };

  next();
};

export default setAssets;
