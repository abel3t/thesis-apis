'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id: { type: String, trim: true },
  user_name: { type: String, trim: true },
  user_image_url: { type: String, trim: true },
  products: [
    {
      product_id: { type: String, trim: true },
      product_name: { type: String, trim: true },
      product_image: { type: String, trim: true },
      price: { type: Number },
    }
  ],
  ship_price: { type: Number },
  total_price: { type: Number },
  processes: [
    {
      date: { type: String },
      title: { type: String },
      content: { type: String },
      is_completed: { type: Boolean }
    }
  ],
  created_at: { type: String, trim: true },
  updated_at: { type: String, trim: true }
});

module.exports = mongoose.model('Order', schema, 'orders');