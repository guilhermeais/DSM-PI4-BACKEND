const Hapi = require("@hapi/hapi")
const userRoutes = require("./src/routes/user.routes")
const consumptionRoutes = require("./src/routes/consumption.routes")
const authRoutes = require('./src/routes/auth.routes')
const productRoutes = require('./src/routes/product.routes')

const server = Hapi.server({
    port: 8000,
    host: "localhost"
})

// Inicializando as rotas
userRoutes.forEach((path) => server.route(path))
authRoutes.forEach((path) => server.route(path))
productRoutes.forEach((path) => server.route(path))
consumptionRoutes.forEach((path) => server.route(path))

module.exports = server