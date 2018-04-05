import jwt = require('jwt-simple');
import bcrypt = require('bcrypt');
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

/* EXAMPLE IMPLEMENTATION */
const exampleUserMap = {
  'scott@scott.pizza': {
    userId: '1',
    email: 'scott@scott.pizza',
    password: 'pizza',
  },
};

export interface User {
  userId: string;
  email: string;
  password: string;
}

export const lookupUser = async (email: string): Promise<boolean> => {
  if (exampleUserMap[email]) {
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};

export const authenticateUser = async (email: string, password: string): Promise<User | void> => {
  const rounds = parseInt(process.env.SALT_ROUNDS, 10);
  const user = exampleUserMap[email];
  // this hash would be stored in a database somewhere,
  const hashed = await bcrypt.hash(user.password, rounds);
  // but this is how you hash a password, then compare raw against hashed
  const result = await bcrypt.compare(password, hashed);
  if (result) {
    return user;
  }
};
