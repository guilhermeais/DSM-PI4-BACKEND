const Hapi = require("@hapi/hapi")

const userRoutes = require("./routes/user.routes")
const consumptionRoutes = require("./routes/consumption.routes")
const authRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')

const server = Hapi.server({
    port: 8080,
    host: "0.0.0.0"
})

// Inicializando as rotas
userRoutes.forEach((path) => server.route(path))
authRoutes.forEach((path) => server.route(path))
productRoutes.forEach((path) => server.route(path))
consumptionRoutes.forEach((path) => server.route(path))

module.exports = server