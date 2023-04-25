const joi = require('joi');

const consumption = {
    payload: joi.object({
        voltage: joi.number().required(),
        power: joi.number().required(),
        current: joi.number().required()
    }).required()
}

module.exports = {consumption}