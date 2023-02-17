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

const updateById = async (name, id) => {
  await conn.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
  );
  return { name, id };
};

const deleteById = async (id) => {
  await conn.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );
};

module.exports = {
  findAll,
  findById,  
  insertProduct,
  updateById,
  deleteById,

};