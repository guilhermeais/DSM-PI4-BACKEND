const controler = require('../controllers/user.controller')
const schema = require('../schemas/user.schemas')

const routes = [
    {
        method: "POST",
        path: '/user',
        config:{
            description: 'Register User',
            handler: controler.create,
            validate: schema.create
        }
    },
    {
        method: "POST",
        path: '/user/auth',
        config:{
            description: 'Authenticate User',
            handler: controler.auth,
            validate: schema.auth
        }
    }
]

module.exports = routes