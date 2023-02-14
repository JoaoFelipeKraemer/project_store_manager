const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

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

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message, newProduct } = await productService.insertProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(201).json(newProduct);
};

module.exports = {
  findAll,
  findById,
  insertProduct,
};