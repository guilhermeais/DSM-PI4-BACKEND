const Usercontroler = require('../controllers/user.controller')
const authController = require('../controllers/auth')
const consumptionController = require('../controllers/consumption.controller')
const schema = require('../schemas/user.schemas')

const routes = [
    {
        method: "POST",
        path: '/user',
        config:{
            auth: false,
            description: 'Register User',
            handler: Usercontroler.create,
            validate: schema.create
        }
    },
    {
        method: "POST",
        path: '/auth',
        config:{
            auth: false,
            description: 'Authenticate User',
            handler: authController.auth,
            validate: schema.auth
        }
    },
    {
        method: "POST",
        path: '/auth',
        config:{
            auth: false,
            description: 'Register Consumption',
            handler: consumptionController.convertConsumtion,
            validate: schema.auth
        }
    },
]

module.exports = routes