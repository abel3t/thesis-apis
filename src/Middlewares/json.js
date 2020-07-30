'use strict';

import { HTTP_STATUS_CODES } from '../Utils/constanst';

module.exports = (req, res, next) => {
  res.json = (obj) => {
    res.statusCode = res.statusCode || HTTP_STATUS_CODES.OK;
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(JSON.stringify(obj, null, 2));
  };
  next();
};