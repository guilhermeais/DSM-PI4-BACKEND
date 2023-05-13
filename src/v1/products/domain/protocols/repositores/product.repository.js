import { NotImplementedError } from '../../../../shared/errors/not-implemented-error'
import { Consumption } from '../../entities/consumption.entity'

class ProductRepository {
  /**
   *
   * @param {string} id
   * @returns {Promise<Product>}
   */
  async findById(id) {
    throw NotImplementedError(this.constructor.name, this.findById.name)
  }

  /**
   * 
   * @param {Consumption} consumption 
   */
  async registerConsumption(consumption) {
    throw NotImplementedError(this.constructor.name, this.registerConsumption.name)
  }
}

export { ProductRepository }
