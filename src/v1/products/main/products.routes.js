import { hapiErrorHandler } from '../../config/http/error-handler'
import { makeRegisterConsumption } from './factories/register-consumption.factory'

export const productRoutes = [
  {
    method: 'POST',
    /**
     * @todo passar a rota para /products/{id}/consumption, porém, precisaremos mudar no IOT @ABBorges1
     */
    path: '/consumption',
    handler: async (request, h) => {
      try {
        const { current: eletricCurrent, power, idProduct } = request.payload
        const registerConsumption = makeRegisterConsumption()
        const consumption = await registerConsumption.execute({
          eletricCurrent,
          power,
          productId: idProduct,
        })
        return h.response(consumption).code(201)
      } catch (error) {
        return hapiErrorHandler(error, h)
      }
    },
  },
]
