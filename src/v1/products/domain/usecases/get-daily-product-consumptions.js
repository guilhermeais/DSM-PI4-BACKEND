import { DistributorGateway } from '../protocols/gateways/distributor.gateway'
import { ProductRepository } from '../protocols/repositores/product.repository'

export class GetDailyProductConsumptions {
  constructor({
    productRepository = new ProductRepository(),
    distributorGateway = new DistributorGateway(),
  }) {
    this.productRepository = productRepository
    this.distributorGateway = distributorGateway
  }

  async execute({ date, productId, distributorId }) {
    const price = await this.distributorGateway.getDistributorPrice(
      distributorId,
      date
    )

    const consumptionsByHour = await this.productRepository.getDayConsumptions({
      date,
      productId,
    })

    return Array.from({ length: 24 }, (_, i) => {
      const hour = i + 1
      const consumption = consumptionsByHour.find(c => c.hour === hour)
      const consumptionInKw = consumption?.kw || 0
      const consumptionInMoney = consumptionInKw * price

      return {
        consumptionInKw,
        consumptionInMoney
      }
    })
  }
}
