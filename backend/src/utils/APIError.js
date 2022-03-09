import httpStatus from 'http-status';

class APIError extends Error {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, extra = null) {
    super(message, status, extra);
    Error.captureStackTrace(this, APIError);
  }
}

export default APIError;
