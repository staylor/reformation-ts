import jwt = require('jwt-simple');
import { Request } from 'express';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';

interface AuthTokenPayload {
  userId: string;
}

export const authStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([
      (req: Request) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies[process.env.TOKEN_KEY];
        }
        return token;
      },
    ]),
    secretOrKey: process.env.TOKEN_SECRET,
  },
  (jwtPayload: AuthTokenPayload, done: VerifiedCallback) => {
    if (!jwtPayload.userId) {
      done(new Error('No userId in JWT'), false);
    } else {
      done(null, jwtPayload);
    }
  }
);

export const createToken = (payload: AuthTokenPayload): string =>
  jwt.encode(payload, process.env.TOKEN_SECRET);
