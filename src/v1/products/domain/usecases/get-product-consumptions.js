import { ProductRepository } from '../protocols/repositores/product.repository'

export class GetProductConsumptions {
  constructor({ productRepository = new ProductRepository() }) {
    this.productRepository = productRepository
  }
}
