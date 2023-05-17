import { RegisterConsumption } from '../../domain/usecases/register-consumption';
import { SequelizeProductRepository } from '../../infra/repositories/sequelize-product-repository';

export function makeRegisterConsumption() {
  return new RegisterConsumption({
    productRepository: new SequelizeProductRepository()
  })
}