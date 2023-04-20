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
    }
]

module.exports = routes