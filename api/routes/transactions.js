const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/', (req, res) => {
  Transaction.find()
  .exec()
  .then(transactions => {
    res.status(200).json({
      status: 200,
      message : "Get data transaction is successfully",
      data : transactions
    })
  })
  .catch(err => {
    res.status(500).json({
      error : err
    });
  });
});
/* Get By Id */
router.get('/:id', (req, res) => {
  Transaction.findById(req.params.id)
    .then(transactions => {
      res.status(200).json({
        data: transactions
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
/* POST */
router.post('/',(req,res) => {
  let { number, payment, metode, total, id_user } = req.body;

  let transactionAdd = new Transaction({
    transaction_number : number,
    transaction_payment: payment,
    transaction_metode: metode,
    transaction_total: total,
    transaction_id_user: id_user
  });

  transactionAdd.save()
    .then(transactions => {
      res.status(200).json({
        status : 200,
        message : 'Transactions has been added',
        data : transactions
      })
    })
    .catch(err => {
      res.status(500).json({
        error : err
      });
    });
});
  
module.exports = router;
