import { ProductController } from '../../../../application/controllers/product.controller'
import { makeRegisterConsumption } from '../../domain/usecases'

export function makeProductController() {
  return new ProductController({
    registerConsumption: makeRegisterConsumption(),
  })
}
