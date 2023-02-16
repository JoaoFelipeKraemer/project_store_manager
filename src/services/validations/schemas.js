const Joi = require('joi');

const idSchema = Joi.required();
const saleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().strict().integer().min(1)
    .required(),
});
// console.log(saleSchema.validate({
//   productId: 1,
//   quantity: 'oi',
// }).error.details);
module.exports = {

  idSchema,
  saleSchema,

};