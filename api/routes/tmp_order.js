const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const TmpOrder = require('../models/tmpCart')
router.get('/', (req, res) => {
    TmpOrder.find()
    .exec()
    .then(tmpOrder => {
      res.status(200).json({
        data: tmpOrder
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    TmpOrder.findById(id)
      .exec()
      .then(tmpOrder => {
        res.status(200).json({
          data: tmpOrder
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  })
router.post('/', (req, res) => {
    const tmpCart = new TmpOrder({
    _id: new mongoose.Types.ObjectId(),
    tmp_no_order: req.body.tmp_no_order,
    tmp_session_order: req.body.tmp_session_order,
    tmp_number_of_product: req.body.tmp_number_of_product,
    tmp_amount_ordered: req.body.tmp_amount_ordered
    });
    tmpCart
    .save()
    .then(result => {
      res.status(201).json({
        message: "success to insert data",
        created: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.field] = ops.value;
    }
    TmpOrder.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    TmpOrder.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
module.exports = router;
