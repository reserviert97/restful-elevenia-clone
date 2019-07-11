const express = require('express');
const router = express.Router();
const multer = require('multer');

const Product = require('../models/product');
const Category = require('../models/category');
const User = require('../models/user');
/** FILE UPLOAD */

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString().replace(/:/g, '-') +'-'+ file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage, 
  limits: {fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

/* ************************************************************ */
router.get('/tes',(req,res) => {
  let limit = (req.query.limit) ? parseInt(req.query.limit) : 10;
  let page = (req.query.page) ? parseInt(req.query.page) : 1;
  
  let offset = (page - 1) * limit;

  Product.find()
    .limit(limit)
    .skip(offset)
    .then(data => {
      res.json({
        status : 200,
        message : 'get products success',
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
/* ************************************************************ */
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
/* GET BY ID */
router.get('/getById/:id', (req, res) => {
  const id = req.params.id
  Product.findById(id)
    .exec()
    .then(products => {
      Category.findById({_id : products.product_IdCategory})
        .then(categories => {
          User.findOne({_id : products.product_sellerID, role: 'seller'})
          .then(users => {
          res.status(200).json({
              data: {
                product_id : id,
                seller : users.name,
                product_name : products.product_name,
                product_price: products.product_price,
                details : {
                  product_stock : products.product_stock,
                  condition : "Good",
                  number_of_product: 'P-0001',
                  product_weight: '2kg',
                  country_of_origin: 'Indonesia',
                  warranty : true,
                },
                Photo : [products.photo,products.photo],
                Category: categories.category_name
              }
            })
          })
        })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
})
/* GET BY CATEGORY ID */
router.get('/:id', (req, res) => {
  const id = req.params.id
  let limit = (req.query.limit) ? parseInt(req.query.limit) : 10;
  let page = (req.query.page) ? parseInt(req.query.page) : 1;
  
  let offset = (page - 1) * limit;

  Product.find({product_IdCategory : id})
    .limit(limit)
    .skip(offset)  
    .then(products => {
      Category.findById({ _id : id })
        .then(categories => {
          Product.find().then(totalProduct => {
            if(products != ""){
              res.status(200).json({
                status: 200,
                message: 'Get products is successfully',
                totalRow : totalProduct.length,
                totalPage: Math.ceil(parseInt(totalProduct.length) / limit),
                product_name_category : categories.category_name,
                data : products
              })
            } else {
              res.status(404).json({
                status : 404,
                message : 'Data not found !'
              })
            }
          })
        })
    })
    .catch(err => {
      res.status(500).json({
        status : 500,
        message: err.message,
        data: []
      });
    });
})
/* POST */
router.post('/',upload.single('photo'),(req,res) => {
  let { price, name, stock, description, pCategory,pSID } = req.body;

  let productAdd = new Product({
    product_price : price,
    product_name: name,
    product_stock: stock,
    photo: req.file.path,
    product_description: description,
    product_IdCategory : pCategory,
    product_sellerID : pSID
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
    Product.findById({_id : productId })
    .then(productsData => {
      res.status(200).json({
        status : 200,
        results : 'Data has been updated',
        data : productsData
      })
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
