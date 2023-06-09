import { Server } from 'socket.io'
import { ProductPubSubEventEmitter } from '../products/infra/gateways/product-pubsub.gateway'

export const SOCKET_EVENTS = {
  products: {
    SUBSCRIBE_CONSUMPTIONS: 'products:subscribe-consumptions',
    NEW_CONSUMPTION: 'products:new-consumption',
  },
}

export function makeSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*'
    }
  })
  const productPubSub = ProductPubSubEventEmitter.create()

  io.of('/products').on('connection', clientSocket => {
    console.log(`new socket connection: ${clientSocket.id}`)

    clientSocket.on(
      SOCKET_EVENTS.products.SUBSCRIBE_CONSUMPTIONS,
      ({ productId }) => {
        console.log('Subscribing', clientSocket.id, 'to', productId)
        if (!productId) {
          clientSocket.emit('exception', {
            message: 'Missing productId!',
          })

          return
        }

        productPubSub.listenToConsumptions(
          { productId, subscriberId: clientSocket.id },
          consumption => {
            clientSocket.emit(
              SOCKET_EVENTS.products.NEW_CONSUMPTION,
              consumption
            )
          }
        )
      }
    )

    clientSocket.on('disconnect', () => {
      productPubSub.unsubcribe({
        subscriberId: clientSocket.id,
      })
    })
  })

  return io
}
