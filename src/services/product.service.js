const productModel = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
}; 

const findById = async (id) => {
  const erro = schema.validateId(id);
  if (erro.type) return erro;
  const products = await productModel.findById(id);
  if (!products) return { type: 'INVALID_VALUE', message: 'Product not found' };
  return { type: null, message: products };
};

module.exports = {
  findAll,
  findById,
};
