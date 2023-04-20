const Hapi = require("@hapi/hapi")
const userRoutes = require("./src/routes/user.routes")


const server = Hapi.server({
    port: 8000,
    host: "localhost"
})

userRoutes.forEach((path) => server.route(path))

module.exports = server