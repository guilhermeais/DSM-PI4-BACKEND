const {
  NotImplementedError,
} = require('../../../../shared/errors/not-implemented-error')
const { Consumption } = require('../../entities/consumption.entity')

class ConsumptionRepository {
  /**
   * 
   * @param {Consumption} consumption 
   * @returns {Promise<Consumption>}
   */
  async save(
    consumption
  ) {
    throw NotImplementedError(this.constructor.name, this.save.name)
  }
}

module.exports = { ConsumptionRepository }