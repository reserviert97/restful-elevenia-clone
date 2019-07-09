const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_name: {
    type: String,
    required: true
  },
  user_email: { 
    type: String, 
    required: true, 
    unique: true, 
    match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  user_password: { 
    type: String, 
    required: true
  },
  user_address: {
    type: String,
    required: true
  },
  user_role: {
    type: String,
    required: true
  },
  user_rek_number: {
    type: Number,
  },
  user_postalcode: {
    type: Number,
    required: true
  },
  user_photo: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('User', userSchema, 'users');