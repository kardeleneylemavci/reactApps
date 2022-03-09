import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from '../config';
import User from '../models/user';

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwt = new Strategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.sub, (err, user) => {
    if (err) {
      return done(err, null);
    }

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.use('jwt', jwt);

export default passport.initialize();
