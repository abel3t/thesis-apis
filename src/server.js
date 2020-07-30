'use strict';

import http from 'http';
import router from './routes';
import finalhandler from 'finalhandler';

const server = http.createServer((req, res) => {
  router(req, res, finalhandler(req, res));
});

module.exports = server;