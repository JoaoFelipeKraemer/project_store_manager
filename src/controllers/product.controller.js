const productServices = require('../services');

const findAll = async (res, _req) => {
  const { productService } = await productServices.findAll();
  return res.status(200).json(productService);
};

const findById = async (res, req) => {
  const { id } = req.params;
  const { type, message } = await productServices.findById(id);
  if (!type) {
    return res.status(404).json();
  }
  return res.status(200).json(message);
};

module.exports = { findAll, findById };