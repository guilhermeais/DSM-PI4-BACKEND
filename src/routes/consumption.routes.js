const ConsumptionController = require('../controllers/consumption.controller')
const ConsumptionSchema = require('../schemas/consumption.schemas')

const routesConsumption = [
    {
        method: "POST",
        path: '/consumption',
        config:{
            auth: false,
            description: 'Register Consumption',
            handler: ConsumptionController.convertConsumtion,
            validate: ConsumptionSchema.consumptionRegister
        }
    },
    {
        method: "GET",
        path: '/consumption/{product}',
        config:{
            description: 'Search Consumptions',
            handler: ConsumptionController.searchConsumptions,
            validate: ConsumptionSchema.searchConsumptions
        }
    }
]

module.exports = routesConsumption