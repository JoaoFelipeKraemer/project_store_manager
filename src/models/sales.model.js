const camelize = require('camelize');
const conn = require('./connection');

const insertSalesId = async () => { // INSERT INTO sales e sales_products, uma venda de um ou mais produtos em 1 requisição, 
  const [{ insertId }] = await conn.execute(`
  INSERT INTO StoreManager.sales (id, date) VALUES (default, default)
   `, []); 
  return insertId;
};
const insertSale = async (id, productId, quantity) => {
  const [{ insertId }] = await conn.execute(`
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)
  `, [id, productId, quantity]);
  // console.log(insertId);
  return camelize(insertId);
};

const findProductId = async (id) => {
  const [[result]] = await conn.execute(`
  SELECT product_id FROM StoreManager.sales_products WHERE product_id = ?`, [id]);
  return result;
};

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

module.exports = {
  insertSalesId,
  findProductId,
  insertSale,
  allSales,
  salesById,
};
