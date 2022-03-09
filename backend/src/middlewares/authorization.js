import passport from 'passport';
import httpStatus from 'http-status';
import APIError from '../utils/APIError';

const handleJWT = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  const logIn = req.logIn;
  const apiError = new APIError(
    error ? error.message : 'Unauthorized',
    httpStatus.UNAUTHORIZED
  );

  // log user in
  try {
    if (error || !user) {
      throw error;
    }
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  req.user = user.transform();
  return next();
};

export default (req, res, next) => passport.authenticate(
  'jwt',
  { session: false },
  handleJWT(req, res, next)
)(req, res, next);
