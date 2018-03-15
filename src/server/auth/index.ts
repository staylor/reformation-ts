import bodyParser = require('body-parser');
import bcrypt = require('bcrypt');
import passport = require('passport');
import { Router, Request, Response } from 'express';
import { getMessages } from 'l10n/utils';
import { authStrategy, createToken } from './strategy/jwt';

const router = Router();

passport.use(authStrategy);

router.use(passport.initialize());

router.post('/auth', bodyParser.json(), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const locale = req.get('Accept-Language') || 'en';
    const messages = getMessages(locale, 'login');

    if (!email || !password) {
      throw new Error(messages.loginEmptyError);
    }

    /* EXAMPLE IMPLEMENTATION */
    const exampleUserMap = {
      'scott@scott.pizza': {
        userId: '1',
        email: 'scott@scott.pizza',
        password: 'pizza',
      },
    };
    const user = exampleUserMap[email];
    if (!user) {
      throw new Error(messages.loginNotFound);
    }

    const rounds = parseInt(process.env.SALT_ROUNDS, 10);
    // this hash would be stored in a database somewhere,
    const hashed = await bcrypt.hash(user.password, rounds);
    // but this is how you hash a password, then compare raw against hashed
    const result = await bcrypt.compare(password, hashed);

    if (!result) {
      throw new Error(messages.loginCredentialsNotFound);
    }

    const payload = {
      userId: user.userId,
    };
    /* END EXAMPLE IMPLEMENTATION */

    const token = createToken(payload);
    res.json({ token });
  } catch (e) {
    res.json({ error: e.message });
  }
});

export default router;
