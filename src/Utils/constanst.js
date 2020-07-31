'use strict';

const HTTP_STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401
};

const USER_ACTIONS = {
  SIGN_UP: 'sign-up',
  LOGIN: 'login',
  LOGOUT: 'logout'
};

module.exports = {
  HTTP_STATUS_CODES,
  USER_ACTIONS
};