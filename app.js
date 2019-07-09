const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoute = require('./api/routes/products');
const categoryRoute = require('./api/routes/categories');
const cartRoute = require('./api/routes/cart');
const transactionRoute = require('./api/routes/transactions');
const userRoute = require('./api/routes/users');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


/**
 * CORS SETUP
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({
    })
  }
  next();
});

/**
 * Routing
 */

app.use('/user', userRoute);
app.use('/products', productRoute);
app.use('/categories', categoryRoute);
app.use('/cart', cartRoute);
app.use('/transactions', transactionRoute);

/**
 * Error Handler
 */
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});


module.exports = app;


