const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  },
  products: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true 
  }],
  total_of_product: {
    type: Number,
    required: true
  },
  total_amount_ordered: {
    type: Number, 
    required: true
  },
});

module.exports = mongoose.model('TmpOrder', orderSchema, 'tmp_order')