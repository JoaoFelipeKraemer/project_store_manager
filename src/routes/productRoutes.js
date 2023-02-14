const express = require('express');
const { productControler } = require('../controllers');

const router = express.Router();

router.get('/', productControler.findAll); // dessa forma é redundate

router.get('/:id', productControler.findById);

router.post('/', productControler.insertProduct);

module.exports = router;
// post = create
// get = read
// put = update
// delete = delete