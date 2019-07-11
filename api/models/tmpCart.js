const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  },
  products: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'  
  }],
  quantity: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number, 
    required: true
  },
},{ versionKey : false });

module.exports = mongoose.model('TmpOrder', orderSchema, 'tmp_order')