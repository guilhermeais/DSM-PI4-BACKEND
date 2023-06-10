import { GetLastHourConsumptions } from '../../../../domain/usecases/get-last-hour-consumptions'
import { SequelizeProductRepository } from '../../../../infra/repositories/sequelize-product-repository'

export function makeGetLastHourConsumptions() {
  return new GetLastHourConsumptions({
    productRepository: new SequelizeProductRepository(),
  })
}
