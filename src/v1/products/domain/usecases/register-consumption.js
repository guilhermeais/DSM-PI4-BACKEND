import { Consumption } from '../entities/consumption.entity'
import { EntityNotFoundError } from '../errors/entity-not-found-error'
import { ProductPubSubGateway } from '../protocols/gateways/product-pubsub.gateway'
import { ProductRepository } from '../protocols/repositores/product.repository'

export class RegisterConsumption {
  constructor({
    productRepository = new ProductRepository(),
    productPubSub = new ProductPubSubGateway(),
  }) {
    this.productRepository = productRepository
    this.productPubSub = productPubSub
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

    await this.productPubSub.publishConsumption(productId, consumption)
    return consumption
  }
}
