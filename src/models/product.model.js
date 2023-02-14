const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute('SELECT * FROM StoreManager.products');
  return result;
};

const findById = async (id) => {
  const [[product]] = await conn.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return product;
};

const insertProduct = async (name) => {
    const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?);',
    [...Object.values(name)],
    );
      return insertId;
};

module.exports = {
  findAll,
  findById,  
  insertProduct,

};