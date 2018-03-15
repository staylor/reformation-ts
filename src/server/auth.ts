import bodyParser = require('body-parser');
import bcrypt = require('bcrypt');
import passport = require('passport');
import jwt = require('jwt-simple');
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Router, Request, Response } from 'express';
import { getMessages } from 'l10n/utils';

const exampleUserMap = {
  'scott@scott.pizza': {
    userId: '1',
    email: 'scott@scott.pizza',
    password: 'pizza',
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

router.post('/auth', bodyParser.json(), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const locale = req.get('Accept-Language') || 'en';
    const messages = getMessages(locale, 'login');

    if (!email || !password) {
      throw new Error(messages.loginEmptyError);
    }

    const user = exampleUserMap[email];
    if (!user) {
      throw new Error(messages.loginNotFound);
    }

    const hashed = await bcrypt.hash(user.password, process.env.SALT_ROUNDS);
    const result = await bcrypt.compare(password, hashed);

    if (!result) {
      throw new Error(messages.loginCredentialsNotFound);
    }

    const payload = {
      userId: user.userId,
    };

    const token = jwt.encode(payload, process.env.TOKEN_SECRET);
    res.json({ token });
  } catch (e) {
    res.json({ error: e.message });
  }
});

export default router;
