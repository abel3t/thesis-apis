'use strict';

/**
 *
 * @param name The name of Logging
 * @param args The arguments to stringify
 */
function printLogConsole(name, args) {
  const current = new Date(Date.now()).toISOString();
  if (args) {
    console.info(`>> time: ${current}, name: ${name}, data: ${JSON.stringify(args)}`);
  } else {
    console.info(`>> time: ${current}, name: ${name}`);
  }
}

module.exports = {
  printLogConsole
};