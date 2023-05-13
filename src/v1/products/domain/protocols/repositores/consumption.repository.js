import { NotImplementedError } from '../../../../shared/errors/not-implemented-error'
import { Consumption } from '../../entities/consumption.entity'

class ConsumptionRepository {
  /**
   *
   * @param {Consumption} consumption
   * @returns {Promise<Consumption>}
   */
  async save(consumption) {
    throw NotImplementedError(this.constructor.name, this.save.name)
  }
}

export { ConsumptionRepository }
