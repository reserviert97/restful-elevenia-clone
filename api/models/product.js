const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

  product_category : { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},

  product_price: {
    type: Number,
    required: true
  },
  product_name: { 
    type: String, 
    ref: 'User', required: true 
  },
  product_stock: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  product_description: {
    type: String, ref: 'User', 
    required: true
  },
  product_date_of_entry: {
    type: Date, default: Date.now
  }
}, { versionKey : false });

module.exports = mongoose.model('Product', productSchema, 'products')