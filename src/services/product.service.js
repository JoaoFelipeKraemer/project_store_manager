const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { products };
}; 

const findById = async (id) => {
  const erro = schema.validateId(id);
  if (erro.type) return erro;
  const product = await productModel.findById(id);
  if (!product) return { type: 'INVALID_VALUE', message: 'Product not found' };
  return { product };
};

const insertProduct = async (name) => {
  const newProductId = await productModel.insertProduct({ name });
  const newProduct = await productModel.findById(newProductId);
  return { newProduct };
};

const updateById = async (name, id) => {
  const product = await productModel.findById(id);
  if (!product) return { type: 404, message: 'Product not found' };
  const result = await productModel.updateById(name, id);
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateById,
};
