import { NotImplementedError } from '../../../../shared/errors/not-implemented-error'

export class DistributorGateway {
  /**
   * @param {string} distributorId
   * @param {Date} date
   * @returns {Promise<number>}
   */
  getDistributorPrice(distributorId, date) {
    throw new NotImplementedError(
      this.constructor.name,
      this.getDistributorPrice.name
    )
  }
}
