'use strict';

import { connectFirebase } from './db/connect';

const firebase = connectFirebase();

/**
 *
 * @param token {String} Token of firebase generated for client
 * @returns {Promise<unknown>}
 */
function verifyIdToken(token) {
  return new Promise((resolve, reject) => {
    firebase.auth().verifyIdToken(token)
      .then(payload => {
        // For testing firebase token is expired in 1 min
        /*const { exp } = payload;
        const time_now = moment().unix() + 59 * 60;
        if (exp > time_now) {
          resolve(payload);
        } else {
          reject(new Error('Firebase ID token has expired.'));
        }*/
        resolve(payload);
      })
      .catch(error => reject(error));
  });
}

module.exports = {
  verifyIdToken
};