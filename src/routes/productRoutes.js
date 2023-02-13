const express = require('express');
const { productControler } = require('../controllers');

const router = express.Router();

router.get('/', (req, res) => { // dessa forma é redundate
  productControler.findAll(req, res);
});

router.get('/:id', (req, res) => {
  productControler.findById(req, res);
});

module.exports = router;
// post = create
// get = read
// put = update
// delete = delete