const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/', (req, res) => {
  Transaction.find()
  .exec()
  .then(transactions => {
    res.status(200).json({
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
        data : transactions
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
  let transactionId = req.params.id;
  let updateTransaction = {};

  for(const transactions of req.body) {
    updateTransaction[transactions.field] = transactions.value;
  }

  Transaction.update({ _id: transactionId },{ $set: updateTransaction })
  .then(transaction => {
    res.status(200).json({
      data : transaction
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
  let transactionId = req.params.id;

  Transaction.remove({ _id: transactionId })
  .then(transactions => {
    res.status(200).json({
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
