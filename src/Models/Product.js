'use strict';

const mongoose = require('mongoose');

const content = [
  {
    user_id: { type: String },
    avatar_url: { type: String },
    name: { type: String },
    star: { type: Number },
    title: { type: String, trim: true },
    content: { type: String, trim: true },
    note: { type: String, trim: true }
  }
];

const schema = new mongoose.Schema({
  name: { type: String, trim: true },
  title: { type: String, trim: true },
  rating: {
    totals: { type: Number },
    stars: { type: Number },
    content,
  },
  comment: content,
  note: { type: String, trim: true },
  producer: { type: String, trim: true },
  imei: { type: String, trim: true },
  free_ship: {
    status: { type: Boolean },
    note: { type: String, trim: true }
  },
  price: {
    normal_prize: { type: Number },
    sale_price: { type: Number },
    market_price: { type: Number }
  },
  description: { type: String, trim: true },
  options: [
    {
      title: { type: String },
      chooses: [{
        name: { type: String },
        images: [{ type: String }]
      }]
    }
  ],
  total: { type: Number },
  remainder: { type: Number },
  created_at: { type: String, trim: true },
  updated_at: { type: String, trim: true }
});

module.exports = mongoose.model('Product', schema, 'products');