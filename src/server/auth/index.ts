import bodyParser = require('body-parser');

import passport = require('passport');
import { Router, Request, Response } from 'express';
import { getMessages } from 'l10n/utils';
import { authStrategy, createToken, lookupUser, authenticateUser } from './strategy/jwt';

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

    const userExists = await lookupUser(email);
    if (!userExists) {
      throw new Error(messages.loginNotFound);
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      throw new Error(messages.loginCredentialsNotFound);
    }

    const payload = {
      userId: user.userId,
    };

    const token = createToken(payload);
    res.json({ token });
  } catch (e) {
    res.json({ error: e.message });
  }
});

export default router;
