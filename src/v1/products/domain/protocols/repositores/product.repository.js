import { NotImplementedError } from '../../../../shared/errors/not-implemented-error'

class ProductRepository {
  /**
   *
   * @param {string} id
   * @returns {Promise<Product>}
   */
  async findById(id) {
    throw NotImplementedError(this.constructor.name, this.findById.name)
  }
}

export { ProductRepository }
