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

const haveProductId = async (sales) => {
  // verifica se existe no banco de dados
  const mapear = sales.map(({ productId }) => salesModel.findbyId(productId));

  const productIdData = await Promise.all(mapear);
  return productIdData.some((e) => !e.length);
};

const insertSale = async (sales) => {
  const errors = sales.map((product) => validateSale(product));
  const Error = errors.find((error) => error.type);
  if (Error) {
    if (Error.message.includes('than')) {
      return { type: 422, message: Error.message };
    }      
  return { type: 400, message: Error.message };
  }
  if (await haveProductId(sales)) return { type: 404, message: 'Product not found' };

  const insertId = await salesModel.insertSalesId();

  const result = sales.map((e) => salesModel.insertSale(insertId, e.productId, e.quantity));
  const [promiseInsert] = await Promise.all(result);

  const response = {
    id: insertId,
    itemsSold: promiseInsert,
  };

  return response;
};

module.exports = {
  allSales,
  salesById,
  insertSale,
};
