const express = require('express');
const productControler = require('../controllers');

const router = express.Router();

router.get('/', () => {
  productControler.findAll();
});

router.get('/:id', () => {
  productControler.findById();
});

module.exports = router;
// post = create
// get = read
// put = update
// delete = delete