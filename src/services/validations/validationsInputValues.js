const { idSchema, saleSchema } = require('./schemas');

const validateId = (id) => {
const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: 'Product not found' };

  return { type: null, message: '' };
};

const validateSale = (sale) => {
  const { error } = saleSchema.validate(sale);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

module.exports = {
  validateSale,
  validateId,

};