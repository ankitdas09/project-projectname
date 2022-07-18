const Joi = require('joi')
const indexSchemaValidation = Joi.object({
    weight: Joi.number().min(1).required(),
    age: Joi.number().min(1).required(),
    height: Joi.number().min(1).required(),
    bloodSugar: Joi.number().min(1).required(),
}).required()
module.exports = indexSchemaValidation