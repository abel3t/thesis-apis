require('dotenv').config();

const server = require('./build/server');
const { printLogConsole } = require('./src/Utils/logging');

const { PORT = 8080 } = process.env;

server.listen(PORT, () => {
  printLogConsole('Starting server:', { port: PORT });
});