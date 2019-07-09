const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Category', orderSchema, 'category')