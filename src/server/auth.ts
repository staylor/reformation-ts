import bodyParser = require('body-parser');
import bcrypt = require('bcrypt');
import passport = require('passport');
import jwt from 'jwt-simple';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Router, Request, Response } from 'express';

const SALT_ROUNDS = 10;

const exampleUserMap = {
  'scott@scott.pizza': {
    userId: '1',
    email: 'scott@scott.pizza',
    hash: bcrypt.hash('pizza', SALT_ROUNDS),
  },
};

const router = Router();

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        req => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies[process.env.TOKEN_KEY];
          }
          return token;
        },
      ]),
      secretOrKey: process.env.TOKEN_SECRET,
    },
    (jwtPayload, done) => {
      if (!jwtPayload.userId) {
        done(new Error('No userId in JWT'), false);
      } else {
        done(null, jwtPayload);
      }
    }
  )
);

router.use(passport.initialize());

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

export default router;
