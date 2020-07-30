'use strict';

import mongoose from 'mongoose';
import firebase from 'firebase-admin';

const { printLogConsole } = require('../logging');

function connectMongoDB() {
  const { MONGO_URL } = process.env;
  mongoose.connect(
    MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(
      () => printLogConsole('Database is Connected!'),
      () => printLogConsole('Can\'t connect to the Database')
    );
}

function connectFirebase() {
  const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  };

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB
  });

  return firebase;
}

module.exports = {
  connectMongoDB,
  connectFirebase
};