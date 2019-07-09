const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Category = require('../models/category');
router.get('/', (req, res) => {
  Category.find()
    .exec()
    .then(category => {
      res.status(200).json({
        data: category
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
  Category.findById(id)
    .exec()
    .then(category => {
      res.status(200).json({
        data: category
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
})
router.post('/', (req, res) => {
  const category = new Category({
  _id: new mongoose.Types.ObjectId(),
  category_name: req.body.category_name
  });
  category
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
  const category_name = req.body.category_name;
  Category.update({ _id: id }, { category_name: category_name })
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
  Category.remove({ _id: id })
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
