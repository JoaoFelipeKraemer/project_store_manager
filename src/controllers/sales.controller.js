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

module.exports = {
  allSales,
  salesById,
};
