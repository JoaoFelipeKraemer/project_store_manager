const express = require('express');
const { salesControler } = require('../controllers');

const router = express.Router();

router.get('/', salesControler.allSales);

router.get('/:id', salesControler.salesById);

router.post('/', salesControler.insertSale);

module.exports = router;
// post = create
// get = read
// put = update
// delete = delete