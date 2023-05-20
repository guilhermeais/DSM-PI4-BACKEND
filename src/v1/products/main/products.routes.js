import { hapiErrorHandler } from '../../config/http/error-handler'
import { makeProductController } from './factories/application/controllers/product.controller.factory'

export const productRoutes = [
  {
    method: 'POST',
    /**
     * @todo passar a rota para /products/{id}/consumption, porém, precisaremos mudar no IOT @ABBorges1
     */
    path: '/consumption',
    config: {
      description: 'Register Consumption',
    },
    /**
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     * @returns
     */
    handler: async (request, h) => {
      try {
        const productController = makeProductController()
        const consumption = await productController.registerConsumption({
          ...request.payload,
        })
        return h.response(consumption).code(201)
      } catch (error) {
        return hapiErrorHandler(error, h)
      }
    },
  },
]
