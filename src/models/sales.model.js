const camelize = require('camelize');
const conn = require('./connection');

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
  allSales,
  salesById,
};
