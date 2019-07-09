const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({

  transaction_number: {
    type: String,
    required: true
  },
  transaction_day: { 
    type: String, 
    ref: 'User', required: true 
  },
  transaction_date: {
    type: String,
    required: true
  },
  transaction_payment: {
    type: String,
    required: true
  },
  transaction_metode: {
    type: String, ref: 'User', 
    required: true
  },
  transaction_total: {
    type: Number, ref: 'User', 
    required: true
  },
  transaction_id_user: {
    type: String, ref: 'User',
    required: true
  }
},{ versionKey : false });

module.exports = mongoose.model('Transaction', transactionSchema, 'transaction')