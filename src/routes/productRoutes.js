const express = require('express');
const { productControler } = require('../controllers');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productControler.findAll); // dessa forma é redundate

router.get('/:id', productControler.findById);

router.post('/', validateName, productControler.insertProduct);

module.exports = router;
// post = create
// get = read
// put = update
// delete = delete