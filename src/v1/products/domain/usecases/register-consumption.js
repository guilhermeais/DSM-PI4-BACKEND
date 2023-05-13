const { Consumption } = require('../entities/consumption.entity')
const { EntityNotFoundError } = require('../errors/entity-not-found-error')
const {
  ConsumptionRepository,
} = require('../protocols/repositores/consumption.repository')
const {
  ProductRepository,
} = require('../protocols/repositores/product.repository')

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

module.exports = { RegisterConsumption }
