const UserControler = require('../controllers/user.controller')
const UserSchema = require('../schemas/user.schemas')


const routesUser = [
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
        method: "GET",
        path: '/user/{id}',
        config:{
            description: 'Infos User',
            handler: UserControler.searchOneUser,
            validate: UserSchema.search
        }
    },
]

module.exports = routesUser