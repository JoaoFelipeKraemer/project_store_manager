const camelize = require('camelize');
const conn = require('./connection');
// 6
const insertSalesId = async () => { // INSERT INTO sales e sales_products, uma venda de um ou mais produtos em 1 requisição, 
  const [{ insertId }] = await conn.execute(`
  INSERT INTO StoreManager.sales (date) VALUES (default)
   `, []); 
  return insertId;
};
const insertSale = async (saleId, { productId, quantity }) => {
   await conn.execute(`
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)
  `, [saleId, productId, quantity]);
 return { productId, quantity };
};

const findProductId = async (id) => {
  const [result] = await conn.execute(`
  SELECT product_id FROM StoreManager.sales_products WHERE product_id = ?`, [id]);
  return result;
};
//

const allSales = async () => {
  const [result] = await conn.execute(
  `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
   FROM StoreManager.sales AS s
   INNER JOIN StoreManager.sales_products AS sp
   ON sp.sale_id = s.id`,
  );
  return camelize(result);
};

const salesById = async (id) => {
  const [result] = await conn.execute(
   `SELECT s.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales AS s 
    INNER JOIN StoreManager.sales_products AS sp
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id`, [id],
  );
  return camelize(result);
};

const deleteById = async (id) => {
  await conn.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id],
  );
};

const findIdUpdate = async (id) => {
  const result = await conn.execute(`
  SELECT * FROM StoreManager.sales_products WHERE sale_id = ?`, [id]);
  return result;
};

module.exports = {
  insertSalesId,
  findProductId,
  findIdUpdate,
  insertSale,
  allSales,
  salesById,
  deleteById,
};
