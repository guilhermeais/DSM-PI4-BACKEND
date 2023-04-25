const joi = require('joi')

const auth = {
    payload: joi.object({
        email: joi.string().required(),
        password: joi.string().min(6).required()
    }).required()
}

module.exports = {auth}