const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  // User.find()
  //   .then(user => {
  //     res.status(200).json({
  //       data: user
  //     })
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       error: err
  //     });
  //   });

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    user_name: 'Latif',
    user_email: 'latif@hotmail.com',
    user_password: 'admin123',
    user_address: 'Cirebon',
    user_role: 'user',
    user_rek_number: 90909090,
    user_postalcode: 90909090,
    user_photo: 'image.jpg'
  })
  user
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Handling post request /products',
        createdProduct: result
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router;
