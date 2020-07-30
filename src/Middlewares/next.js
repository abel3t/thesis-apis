'use strict';

import { HTTP_STATUS_CODES } from '../Utils/constanst';

module.exports = (error, req, res, next) => {
  const  { UNAUTHORIZED, BAD_REQUEST } = HTTP_STATUS_CODES;

  res.statusCode = (error && error.message === 'Token is invalid') ? UNAUTHORIZED : BAD_REQUEST;
  res.json({
    status: 'FAIL',
    reason: error.message ? error.message : error.toString()
  });

  next();
};