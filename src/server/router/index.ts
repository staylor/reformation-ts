import passport = require('passport');
import { Router } from 'express';
import app from './app';
import admin from './admin';
import login from './login';
import render from './render';
import setAssets from './setAssets';
import setTemplate from './setTemplate';

const router = Router();

const pipeline = [render, setTemplate];

const requireAuth = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/login/unauthorized',
});

router.get(/^\/admin/, requireAuth, setAssets('admin.js'), admin, pipeline);
router.get(/^\/login/, setAssets('login.js'), login, pipeline);
router.get('*', setAssets('main.js'), app, pipeline);

export default router;
