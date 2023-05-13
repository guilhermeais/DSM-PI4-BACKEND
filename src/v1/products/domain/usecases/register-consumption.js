import { Consumption } from '../entities/consumption.entity'
import { EntityNotFoundError } from '../errors/entity-not-found-error'
import { ConsumptionRepository } from '../protocols/repositores/consumption.repository'
import { ProductRepository } from '../protocols/repositores/product.repository'

class RegisterConsumption {
  constructor({
    consumptionRepository = new ConsumptionRepository(),
    productRepository = new ProductRepository(),
  }) {
    this.consumptionRepository = consumptionRepository
    this.productRepository = productRepository
  }

  async execute({ eletricCurrent, power, productId }) {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new EntityNotFoundError('Produto')
    }

    const consumption = Consumption.create({
      eletricCurrent,
      power,
      kwmDate: new Date(),
      productId,
    })

    const { id } = await this.consumptionRepository.save(consumption)
    consumption.id = id
    return consumption
  }
}

export { RegisterConsumption }
