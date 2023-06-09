const express = require('express');
const { productControler } = require('../controllers');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/search', productControler.productName);

router.get('/', productControler.findAll); // dessa forma é redundate

router.get('/:id', productControler.findById);

router.post('/', validateName, productControler.insertProduct);

router.put('/:id', validateName, productControler.updateById);

router.delete('/:id', productControler.deleteById);

module.exports = router;
// post = create
// get = read
// put = update
// delete = delete