const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', (req, res) => {
  
  Product.find()
    .exec()
    .then(products => {
      res.status(200).json({
        data : products
      })
    })
    .catch(err => {
      res.status(500).json({
        error : err
      });
    });
});

router.post('/',(req,res) => {
  let { price, name, stock, photo, description, date_of_entry } = req.body;

  let productAdd = new Product({
    product_price : price,
    product_name: name,
    product_stock: stock,
    photo: photo,
    product_description: description,
    product_date_of_entry: date_of_entry
  });

  productAdd.save()
    .then(products => {
      res.status(200).json({
        data : products
      })
    })
    .catch(err => {
      res.status(500).json({
        error : err
      });
    });
});

router.patch('/:id',(req,res) => {
  let productId = req.params.id;
  let updateProduct = {};

  for(const products of req.body) {
    updateProduct[products.field] = products.value;
  }

  Product.update({ _id: productId },{ $set: updateProduct })
  .then(products => {
    res.status(200).json({
      data : products
    })
  })
  .catch(err => {
    res.status(500).json({
      error : err
    });
  });
});  

router.delete('/:id',(req,res) => {
  let productId = req.params.id;

  Product.remove({ _id: productId })
  .then(products => {
    res.status(200).json({
      data : products
    })
  })
  .catch(err => {
    res.status(500).json({
      error : err
    });
  });
});  

module.exports = router;
