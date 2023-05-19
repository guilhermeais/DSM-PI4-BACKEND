import { ProductRepository } from '../protocols/repositores/product.repository'

export class GetDailyProductConsumptions {
  constructor({ productRepository = new ProductRepository() }) {
    this.productRepository = productRepository
  }

  async execute({ date, productId }) {
    const consumptionsByHour = await this.productRepository.getDayConsumptions({
      date,
      productId,
    })

    return Array.from({ length: 24 }, (_, i) => {
      const hour = i + 1
      const consumption = consumptionsByHour.find(c => c.hour === hour)
      return consumption?.kw || 0
    })
  }
}
