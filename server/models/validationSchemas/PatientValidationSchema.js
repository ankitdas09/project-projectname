const Joi = require('joi')
const patientSchemaValidation = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).max(30).required(),
    weight: Joi.number().min(1).required(),
    age: Joi.number().min(1).required(),
    height: Joi.number().min(1).required(),
    bloodSugar: Joi.number().min(1).required(),
}).required()
module.exports = patientSchemaValidation