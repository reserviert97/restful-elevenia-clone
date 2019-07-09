const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/', (req, res) => {

  Order.find()
    .exec()
    .then(orders => {
      res.status(200).json({
        data: orders
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  
})

module.exports = router;
