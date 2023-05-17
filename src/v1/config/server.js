import hapi from '@hapi/hapi'
import { env } from './env'
import { productRoutes } from '../products/main/products.routes'

const server = hapi.server({
  port: env.PORT,
  host: env.HOST,

  routes: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with'],
    },
  },
})

server.route([...productRoutes])

export { server }
