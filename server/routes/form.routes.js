const router = require('express').Router()
const Joi = require('joi')
const isAuthenticated = require('../middleware/isAuthenticated.middleware')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')


const posts = []

const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).max(30).required(),
    weight: Joi.number().required(),
    age: Joi.number().required(),
    height: Joi.number().required(),
    bloodSugar: Joi.number().required(),
}).required()

router.post('/', isAuthenticated, catchAsync(async (req, res, next) => {
    const value = await schema.validateAsync(req.body)
    posts.push(value)
    res.send(posts)
}))

module.exports = router