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
/// /////////////////////////////////// 6
const haveProductId = async (sales) => {
  // verifica se existe no banco de dados
  const mapear = sales.map((product) => salesModel.findProductId(product.productId));
 
  const productIdData = await Promise.all(mapear);

  return productIdData.some((e) => !e.length);
};
/// //////////////////////////////////////////6///////////////////////
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

  const result = sales.map((e) => salesModel.insertSale(insertId, e));
  const promiseInsert = await Promise.all(result);

  const response = {
    id: insertId,
    itemsSold: promiseInsert,
  };
return { type: null, message: response };
};
// /////////////////////////////14
const deleteById = async (id) => { 
  const product = await salesModel.findProductId(id);
  if (!product.length) return { type: 404, message: 'Sale not found' };
  await salesModel.deleteById(id);
  return { type: null, message: '' };
};
/// ////////////////////////////////16

const hasSale = async (id) => {
  const result = await salesModel.salesById(id);
  return result.length;
};

const updateById = async (id, sales) => {
    if (!(await hasSale(id))) {
    return { type: 404, message: 'Sale not found' };
  }
   const errors = sales.map((product) => validateSale(product));
  const Error = errors.find((error) => error.type);
  if (Error) {
    if (Error.message.includes('than')) return { type: 422, message: Error.message };      
  return { type: 400, message: Error.message };
  }
  if (await haveProductId(sales)) return { type: 404, message: 'Product not found' };
  await salesModel.deleteById(id);
  const result = sales.map((e) => salesModel.insertSale(id, e));
  const promiseInsert = await Promise.all(result);

  const response = {
    saleId: id,
    itemsUpdated: promiseInsert,
  };
return { type: null, message: response };
};

module.exports = {
  allSales,
  salesById,
  insertSale,
  deleteById,
  updateById,
};
