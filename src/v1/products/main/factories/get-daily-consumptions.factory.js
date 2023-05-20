import { GetDailyProductConsumptions } from '../../domain/usecases/get-daily-product-consumptions'
import { SequelizeProductRepository } from '../../infra/repositories/sequelize-product-repository'

export function makeGetDailyConsumptions() {
  return new GetDailyProductConsumptions({
    productRepository: new SequelizeProductRepository(),
  })
}
