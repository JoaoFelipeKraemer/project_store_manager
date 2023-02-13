const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute('SELECT * FROM StoreManager.products');
  return result;
};

const findById = async (id) => {
  const [[product]] = await conn.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return product;
};

// const insert = (person) => conn.execute( // post

//     `INSERT INTO people 

//       (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)`,

//     [person.firstName, person.lastName, person.email, person.phone],

//   );

module.exports = {
  findAll,
  findById,  
  // insert,

};