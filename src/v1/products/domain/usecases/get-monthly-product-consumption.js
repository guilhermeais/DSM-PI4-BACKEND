import { ProductRepository } from '../protocols/repositores/product.repository'

export class GetMonthlyProductConsumption {
  constructor({ productRepository = new ProductRepository() }) {
    this.productRepository = productRepository
  }

  async execute({ date, productId }) {
    const daysOfMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate()
    const monthlyConsumption =
      await this.productRepository.getMonthConsumptions(date, productId)

    return Array.from({ length: daysOfMonth }, (_, i) => {
      const day = i + 1
      const consumption = monthlyConsumption.find(
        ({ dayOfMonth }) => dayOfMonth === day
      )

      return consumption?.kw || 0
    })
  }
}
