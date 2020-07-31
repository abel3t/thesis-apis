'use strict';

import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';

import { verifyIdToken } from '../utils/firebase';

passport.use(new BearerStrategy({ passReqToCallback: true }, (req, token, next) => {
  verifyIdToken(token)
    .then(async (payload) => {
      const { _id, user_id, role } = payload;
      const matches = user_id.match(/\d+/g);

      if (matches && matches.length && +matches[0]) {
        const user_token = {
          _id,
          user_id: +matches[0],
          role
        };

        req.user_token = user_token;
        next(null, user_token);
      } else {
        next('Token is invalid');
      }
    })
    .catch(() => {
      next(new Error('Token is invalid'));
    });
}));

export default passport;