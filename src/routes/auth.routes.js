
const AuthController = require('../controllers/auth')
const AuthSchema = require('../schemas/auth.schemas')

const routesAuth = [
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
        path: '/teste',
        config:{
            auth: false,
            description: 'Authenticate User',
            handler: (req, h) =>{
                h.response('OPAAAA')
            }
        }
    },
]

module.exports = routesAuth