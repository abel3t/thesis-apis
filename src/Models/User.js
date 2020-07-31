'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: { type: Number, index: true, unique: true },
  name: { type: String, trim: true },
  email: { type: String, trim: true },
  birthday: { type: String, trim: true },
  address: { type: String, trim: true },
  recent: [
    {
      product_id: { type: String, trim: true },
      last_datetime: { type: String, trim: true },
      total: { type: Number }
    }
  ],
  devices: [
    {
      device_id: { type: String, trim: true },
      device_name: { type: String, trim: true },
      location: {
        lat: { type: Number },
        lng: { type: Number }
      },
      location_name: { type: String },
      last_datetime: { type: String }
    }
  ],
  role: { type: String, trim: true, default: 'user' },
  hash: { type: String, trim: true },
  salt: { type: String, trim: true },
  created_at: { type: Number },
  updated_at: { type: Number },
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', schema, 'users');