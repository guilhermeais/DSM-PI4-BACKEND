import { NotImplementedError } from '../../../../shared/errors/not-implemented-error'
import { Consumption } from '../../entities/consumption.entity'

export class ProductRepository {
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
    throw NotImplementedError(
      this.constructor.name,
      this.registerConsumption.name
    )
  }

  /**
   *
   * @returns {Promise<
   * [{
   *  kw: number,
   *  hour: number
   * }]
   * >}
   */
  async getDayConsumptions({ date, productId }) {
    throw NotImplementedError(
      this.constructor.name,
      this.getDayConsumptions.name
    )
  }

  /**
   *
   * @returns {Promise<
   * [{
   *  kw: number,
   *  dayOfMonth: number,
   * }]
   * >}
   */
  async getMonthConsumptions({ date, productId }) {
    throw NotImplementedError(
      this.constructor.name,
      this.getMonthConsumptions.name
    )
  }
}
