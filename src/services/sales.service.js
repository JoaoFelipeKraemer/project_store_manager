const { salesModel } = require('../models');
const { validateSale } = require('./validations/validationsInputValues');

const allSales = async () => {
  const result = await salesModel.allSales();
  return { result };
}; 

const salesById = async (id) => {
  const result = await salesModel.salesById(id);
  if (result.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

return { type: null, message: result };
};

const insertSale = async (products) => {
  const errors = products.map((sale) => validateSale(sale));
  const Error = errors.find((error) => error.type);
  if (Error) {
    return Error;
  }
  const mapear = products.map((product) => salesModel.findProductId(product.productId));
  const productIdData = await Promise.all(mapear);
  const checkProductId = productIdData.some(
    (value) => typeof value === 'object',
  );
  
  if (checkProductId === false) return 'Product not found';
  // banco de dados product_id tem q ser aqui
  const [insertId] = await salesModel.insertSalesId;

  const promiseInsert = products.map((e) => salesModel
    .insertSale(insertId, e.productId, e.quantity));
  const result = await Promise.all(promiseInsert);
  return result;
};

module.exports = {
  allSales,
  salesById,
  insertSale,
};
