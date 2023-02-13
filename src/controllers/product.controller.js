const { productService } = require('../services');

const findAll = async (_req, res) => {
  const { products } = await productService.findAll();
  return res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message, product } = await productService.findById(id);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(product);
};

module.exports = { findAll, findById };