const Joi = require('joi');

const idSchema = Joi.required();
const saleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().strict().integer().min(1)
    .required(),
});
console.log(saleSchema.validate([
  {
    productId: 1,
    quantity: 10,
  },
  {
    productId: 2,
    quantity: 50,
  },
]).error.details);
module.exports = {

  idSchema,
  saleSchema,

};