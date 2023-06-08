import { EventEmitter } from 'mysql2/typings/mysql/lib/Connection'
import { ProductPubSubGateway } from '../../domain/protocols/gateways/product-pubsub.gateway'

export class ProductPubSubEventEmitter extends ProductPubSubGateway {
  #eventEmitter = new EventEmitter()
  static #instance = null

  static create() {
    if (!ProductPubSubEventEmitter.#instance) {
      ProductPubSubEventEmitter.#instance = new ProductPubSubEventEmitter()
    }

    return ProductPubSubEventEmitter.#instance
  }

  publishConsumption(productId, consumption) {
    this.#eventEmitter.emit(
      ProductPubSubEventEmitter.getConsumptionEventName(productId),
      consumption
    )
  }

  listenToConsumptions(productId, handler) {
    this.#eventEmitter.on(
      ProductPubSubEventEmitter.getConsumptionEventName(productId),
      handler
    )
  }

  static getConsumptionEventName(productId) {
    return `products/${productId}:new-consumption`
  }
}
