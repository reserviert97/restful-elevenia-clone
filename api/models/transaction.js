const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  
  transaction_id_user : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  
  transaction_number: {
    type: Number,
    required: true
  },
  transaction_day: { 
    type: Date, default: Date.now
  },
  transaction_date: {
    type: Date, default: Date.now
  },
  transaction_payment: {
    type: String,
    required: true
  },
  transaction_metode: {
    type: String,
    required: true
  },
  transaction_total: {
    type: Number,
    required: true
  },
  transaction_id_user: {
    type: String,
    required: true
  }
},{ versionKey : false });

module.exports = mongoose.model('Transaction', transactionSchema, 'transaction')