import { ProductRepository } from '../protocols/repositores/product.repository'

export class GetLastHourConsumptions {
  constructor({ productRepository = new ProductRepository() }) {
    this.productRepository = productRepository
  }

  async execute({ productId }) {
    const lastHourConsumptions =
      await this.productRepository.getLastHourConsumptions({ productId })

    return lastHourConsumptions
  }
}
