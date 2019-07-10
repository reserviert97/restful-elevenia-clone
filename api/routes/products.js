const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');


/* ************************************************************ */
router.get('/',(req,res) => {
  let limit = (req.query.limit) ? parseInt(req.query.limit) : 5;
  let page = (req.query.page) ? parseInt(req.query.page) : 1;
  
  let offset = (page - 1) * limit;

  Product.find()
    .limit(limit)
    .skip(offset)
    .then(data => {
      res.json({
        status : 200,
        message : 'Get products success',
        limit : limit,
        page : page,
        totalPage : Math.ceil(parseInt(data.length) / limit),
        data : data
      })
    })
    .catch(err => {
      return res.status(500).json({
        status : 500,
        message : err.message,
        data : []
      })
    })
})

/* GET BY ID */
router.get('/:id', (req, res) => {
  const id = req.params.id
  Product.findById(id)
    .exec()
    .then(products => {
      console.log(products.product_price);
      res.status(200).json({
        data: {
          product_id : id,
          product_price: products.product_price,
          seller : "M.Fadhly NR",
          details : {
            product_stock : products.product_stock,
            condition : "Good",
            number_of_product: 'P-0001',
            product_weight: '2kg',
            country_of_origin: 'Indonesia',
            warranty : true,
          },
          Photo : [products.photo]
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
})
/* GET BY CATEGORY ID */
router.get('/category/:id', (req, res) => {
  const id = req.params.id
  Product.find({product_category : id})  
    .exec()
    .then(products => {
      Category.findOne({ _id : id })
        .exec()
        .then(categories => {
          res.status(200).json({
            data : products,
            product_name_category : categories.category_name
          })
        })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
})
/* POST */
router.post('/',(req,res) => {
  let { price, name, stock, photo, description, pCategory } = req.body;

  let productAdd = new Product({
    product_price : price,
    product_name: name,
    product_stock: stock,
    photo: photo,
    product_description: description,
    product_category : pCategory
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
/* PATCH */
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
/* DELETE */

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
