import fs = require('fs');
import path = require('path');
import bodyParser = require('body-parser');
import bcrypt = require('bcrypt');
import passport = require('passport');
import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jwt-simple';
import app from './app';
import admin from './admin';
import login from './login';
import render from './render';
import setTemplate from './setTemplate';

const router = Router();

const SALT_ROUNDS = 10;

const exampleUserMap = {
  'scott@scott.pizza': {
    userId: '1',
    email: 'scott@scott.pizza',
    hash: bcrypt.hash('pizza', SALT_ROUNDS),
  },
};

router.post('/auth', bodyParser.json(), (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Username or password not set on request');
    }

    const user = exampleUserMap[email];
    if (!user) {
      throw new Error('User not found.');
    }

    bcrypt.compare(password, user.hash).then(result => {
      if (!result) {
        throw new Error('User not found matching email/password combination');
      }

      const payload = {
        userId: user.userId,
      };

      const token = jwt.encode(payload, process.env.TOKEN_SECRET);
      res.json({ token });
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

const manifestPath = path.join(process.cwd(), 'src/public/build/manifest.json');
const manifestJSON = fs.readFileSync(manifestPath, 'utf8');
const clientAssets = JSON.parse(manifestJSON);

const bundles = ['main.js', 'admin.js', 'login.js'];

const vendorJSBundles = Object.keys(clientAssets)
  .filter(file => bundles.indexOf(file) === -1 && file.indexOf('.map') === -1)
  .map(file => clientAssets[file]);

const pipeline = [render, setTemplate];

const setAssets = (entry: string) => (req: Request, res: Response, next: NextFunction) => {
  res.locals.assets = {
    vendorJSBundles,
    mainJSBundle: clientAssets[entry],
  };

  next();
};

const requireAuth = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/login/unauthorized',
});

router.get('/admin', requireAuth, setAssets('admin.js'), admin, pipeline);
router.get('/login', setAssets('login.js'), login, pipeline);
router.get('*', setAssets('main.js'), app, pipeline);

export default router;
