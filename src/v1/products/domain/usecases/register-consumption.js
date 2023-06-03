import { Consumption } from '../entities/consumption.entity'
import { EntityNotFoundError } from '../errors/entity-not-found-error'
import { ProductRepository } from '../protocols/repositores/product.repository'

export class RegisterConsumption {
  constructor({ productRepository = new ProductRepository() }) {
    this.productRepository = productRepository
  }

  async execute({ eletricCurrent, power, productId }) {
    console.log('RegisterConsumption[execute]', `called with: `, {
      eletricCurrent,
      productId,
      power,
    })
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

    const { id } = await this.productRepository.registerConsumption(consumption)
    consumption.id = id
    return consumption
  }
}
