const { salesService } = require('../services');

const allSales = async (_req, res) => {
  const { result } = await salesService.allSales();
  return res.status(200).json(result);
};

const salesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.salesById(id);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};
const insertSale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesService.insertSale(sale);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(201).json(message);
};

module.exports = {
  allSales,
  salesById,
  insertSale,
};
