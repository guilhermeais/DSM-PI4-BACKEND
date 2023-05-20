import { RegisterConsumption } from '../../domain/usecases/register-consumption';

export class ProductController {
  /**
   * @type {RegisterConsumption}
   */
  #registerConsumption;
  constructor({
    registerConsumption
  }) {
    this.#registerConsumption = registerConsumption
  }

  async registerConsumption(data) {
    const { current: eletricCurrent, power, idProduct } = data
    const consumption = await this.#registerConsumption.execute({
      eletricCurrent,
      power,
      productId: idProduct,
    })

    return consumption
  }
}