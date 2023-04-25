//controllers
const UserControler = require('../controllers/user.controller')
const AuthController = require('../controllers/auth')
const ConsumptionController = require('../controllers/consumption.controller')

//schemas
const UserSchema = require('../schemas/user.schemas')
const AuthSchema = require('../schemas/auth.schemas')
const ConsumptionSchema = require('../schemas/consumption.schemas')


const routes = [
    {
        method: "POST",
        path: '/user',
        config:{
            auth: false,
            description: 'Register User',
            handler: UserControler.create,
            validate: UserSchema.create
        }
    },
    {
        method: "POST",
        path: '/auth',
        config:{
            auth: false,
            description: 'Authenticate User',
            handler: AuthController.auth,
            validate:  AuthSchema.auth
        }
    },
    {
        method: "POST",
        path: '/auth',
        config:{
            auth: false,
            description: 'Register Consumption',
            handler: ConsumptionController.convertConsumtion,
            validate: ConsumptionSchema.consumption
        }
    },
]

module.exports = routes