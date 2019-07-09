const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tmp_no_order: { 
    type: String,
    required: true 
  },
 tmp_session_order: {
    type: String,
    required: true
  },
  tmp_number_of_product: {
    type: Number,
    required: true
  },
  tmp_amount_ordered: {
    type: Number, 
    required: true
  },
});

module.exports = mongoose.model('TmpOrder', orderSchema, 'tmp_order')