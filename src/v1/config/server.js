import hapi from '@hapi/hapi'
import { env } from './env'
import { productRoutes } from '../products/main/products.routes'

import legacyProductRoutes from '../../legacy/routes/product.routes'
import legacyRoutesAuth from '../../legacy/routes/auth.routes'
import legacyRoutesUser from '../../legacy/routes/user.routes'

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
productRoutes
server.route([...productRoutes, ...legacyProductRoutes, ...legacyRoutesAuth, ...legacyRoutesUser])

export { server }
