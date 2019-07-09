const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  User.find()
    .then(user => {
      res.status(200).json({
        data: user
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({
          user: user
        })
      }else {
        res.status(404).json({error: "Entry not found"})
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post('/register', (req, res) => {
  const {
    user_name,
    user_email,
    user_password,
    user_address,
    user_role,
    user_rek_number,
    user_postalcode,
    user_photo
  } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    user_name,
    user_email,
    user_password,
    user_address,
    user_role,
    user_rek_number,
    user_postalcode,
    user_photo
  });

  user
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        status: 201,
        message: 'new user successfully created',
        user: result
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    });
});

module.exports = router;
