const router = require('express').Router()
const Joi = require('joi')
const isAuthenticated = require('../middleware/isAuthenticated.middleware')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const isAdmin = require('../middleware/isAdmin.middleware')

const patientSchemaValidation = require('../models/validationSchemas/PatientValidationSchema')
const indexSchemaValidation = require('../models/validationSchemas/IndexValidationSchema')

const patients = [
    { "email": "raveklaw914@gmail.com", "name": "test", "weight": 60, "age": 20, "height": 190, "bloodSugar": 89 },
    { "email": "raveklaw914@gmail.com", "name": "test", "weight": 75, "age": 25, "height": 180, "bloodSugar": 99 }
]

let indexSchema = {
    weight: 20,
    height: 20,
    age: 30,
    bloodSugar: 30
}

const calcIndex = (idx) => {
    currForm = patients[idx]
    // console.log(currForm)
    return ((currForm['weight'] * indexSchema['weight']) + (currForm['height'] * indexSchema['height']) + (currForm['age'] * indexSchema['age']) + (currForm['bloodSugar'] * indexSchema['bloodSugar'])) / 4
}

router.post('/', isAuthenticated, catchAsync(async (req, res, next) => {
    const value = await patientSchemaValidation.validateAsync(req.body)
    patients.push(value)
    res.send(patients)
}))

router.get('/schema', isAuthenticated, (req, res) => {
    res.json(indexSchema)
})

router.post('/schema', isAdmin, catchAsync(async (req, res) => {
    const data = req.body
    const validData = await indexSchemaValidation.validateAsync(data)
    indexSchema = { ...validData }
    res.json(indexSchema)
}))

router.get('/all', isAdmin, (req, res) => {
    let data = patients.map((patient, idx) => {
        index = calcIndex(idx)
        return { ...patient, index: index }
    })
    res.json(data)
})

router.get('/:id', isAdmin, (req, res) => {
    const { id } = req.params
    const currForm = patients[id]
    const calc = calcIndex(id)
    res.json({ ...currForm, index: calc })
})


module.exports = router