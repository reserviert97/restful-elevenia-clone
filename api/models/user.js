const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { 
    type: String, 
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true  
  },
  birthDate: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'buyer'
  },
  profileImage: {
    type: String
  },
  alamat: {
    type: String,
    default: ''
  }
}, { timestamps: true});


module.exports = mongoose.model('User', userSchema, 'users');