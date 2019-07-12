const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerUploads = require('../middleware/multer').multerUploads;
const dataUri = require('../middleware/multer').dataUri;
const cloudinary = require('../../config/cloudinaryConfig');
const DetailProducts = require('../models/detailProducts')

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

/* GET PRODUCT */
router.get('/', (req, res) => {
  let limit = (req.query.limit) ? parseInt(req.query.limit) : 10;
  let page = (req.query.page) ? parseInt(req.query.page) : 1;
  
  let offset = (page - 1) * limit;

  Product.find()
    .limit(limit)
    .skip(offset)
    .then(products => {
      Product.find().then(totalProducts => {
        if(products !== ""){
          res.status(200).json({
            totalRow : totalProducts.length,
            totalPage: Math.ceil(parseInt(totalProducts.length) / limit),
            status : 200,
            message : 'get products success',
            data : products
          })
        }else {
          res.status(404).json({
            status: 404,
            message : "Data not found !"
          })
        }
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
            DetailProducts.findOne({numberOfProduct: id})
              .then(productDetails => {
                console.log(productDetails)
                res.status(200).json({
                  status: 200,
                  results : 'Get data has been successfully',
                  data: {
                    product_id : id,
                    seller : users.name,
                    profileImage : users.profileImage,
                    product_name : products.product_name,
                    product_price: products.product_price,
                    condition: productDetails.condition,
                    countryOfOrigin: productDetails.countryOfOrigin,
                    location: productDetails.location,
                    numberOfProduct: productDetails.numberOfProduct,
                    productWeight: productDetails.productWeight,
                    stock: productDetails.stock,
                    warranty: productDetails.warranty,
                    Photo : products.photo,
                    Category: categories.category_name
                  }
                })
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
            if(products != ""){
              res.status(200).json({
                status: 200,
                message: 'Get products by categories successfully',
                totalRow : products.length,
                totalPage: Math.ceil(parseInt(products.length) / limit),
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
    .catch(err => {
      res.status(500).json({
        status : 500,
        message: err.message,
        data: []
      });
    });
})
/* POST */
router.post('/', multerUploads, (req,res) => {
  console.log('masuk post');
  
  cloudinary.config();
  /* common product */
  let { price, name, stock, description, pCategory,pSID } = req.body;
  /* details product */
  let { condition, productWeight, countryOfOrigin, location, warranty } = req.body;
  console.log('sebelum pengkodisian');
  
  console.log(req.file);
  
  if (req.file) {
    const file = dataUri(req).content;
    console.log('masuk if else');

    return cloudinary.uploader.upload(file)
      .then(result => {
        const image = result.url;
        
        let photo = [];
        photo.push(image)

        let productAdd = new Product({
          product_price : price,
          product_name: name,
          product_stock: stock,
          photo,
          product_description: description,
          product_IdCategory : pCategory,
          product_sellerID : pSID
        });
      
        productAdd.save()
          .then(products => {
            console.log(products)
            let productDetailsAdd = new DetailProducts({
              condition : condition,
              numberOfProduct : products._id,
              productWeight : productWeight,
              countryOfOrigin : countryOfOrigin,
              location : location,
              warranty : warranty,
              stock: products.product_stock
            })
            console.log('save product');
            //add link to category
            Category.findById(id)
            .exec()
            .then(category => {
              let updateData
              let update
              if (category.productId.length != 0){
                updateData = category.productId
                update = [...updateData,products._id]
              } else {
                update = products._id
              }
             
              Category.update({ _id: pCategory }, { productId: update })
              .exec()
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
            })
            
            //===========================
            productDetailsAdd.save()
              .then(detailsProducts => {
                console.log('save detail product');
                
                res.status(200).json({
                  status : 200,
                  result : 'Data has been success created',
                  data : {
                    product: products,
                    detail: detailsProducts 
                  }
                })
              }) 
          })
          .catch(err => {
            res.status(500).json({
              error : err
            });
          });

      })
      .catch((err) => res.status(400).json({
        message: 'something went wrong',
        data: err
      }))
  } else {
    console.log('file gk ada');
    
  }

  
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
