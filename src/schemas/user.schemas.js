const joi = require('joi')

const create = {
    payload: joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().min(6).required()
    }).required()
}

const auth = {
    payload: joi.object({
        email: joi.string().required(),
        password: joi.string().min(6).required()
    }).required()
}

module.exports = { create, auth}