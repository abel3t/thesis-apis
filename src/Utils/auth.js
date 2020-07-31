'use strict';

import Joi from 'joi';
import moment from 'moment/moment';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { USER_ACTIONS } from './constanst';

/**
 * @param user_action {String} login or sign-up?
 * @param args {Object} The arguments
 * @param [args.name] {String} The name of User
 * @param args.email {String} The email of User
 * @param args.password {String} The password of User
 * @param [args.company] {String} The company of User
 * @param [args.role] {String} The role of User
 */
function validateUserInfo(user_action, args) {
  const { SIGN_UP, LOGIN } = USER_ACTIONS;
  if (user_action !== LOGIN && user_action !== SIGN_UP) {
    return {
      value: {},
      error: 'user_action is invalid'
    };
  }

  if (user_action === SIGN_UP) {
    const schema = Joi.object({
      name: Joi.string().min(2).max(255),
      email: Joi.string().email(),
      password: Joi.string().regex(/^[a-zA-Z0-9#?!@$%^&*-<>]{6,30}$/),
      company: Joi.string().min(2).max(255),
      role: Joi.string().min(2).max(255)
    });
    return schema.validate(args);
  }

  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9#?!@$%^&*-<>]{6,30}$/)
  });

  return schema.validate(args);
}

/**
 * @param password {String} The password of User
 */
function encodePassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

  return { hash, salt };
}

function validatePassword(password, hash, salt) {
  const hash_password = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return hash === hash_password;
}

function generateJWT(user_token) {
  const utc_now = moment().unix();
  const { _id, role, id } = user_token;
  return jwt.sign(
    {
      uid: `provision-${id}`,
      user_token: id,
      iss: process.env.FIREBASE_CLIENT_EMAIL,
      sub: process.env.FIREBASE_CLIENT_EMAIL,
      aud: process.env.FIREBASE_AUD,
      iat: utc_now,
      exp: utc_now + 5 * 60,
      claims: {
        _id,
        user_id: id,
        role
      }
    },
    process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    {
      algorithm: 'RS256'
    }
  );
}

module.exports = {
  validateUserInfo,
  encodePassword,
  validatePassword,
  generateJWT
};