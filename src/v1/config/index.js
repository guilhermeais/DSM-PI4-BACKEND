import { server } from './server'
import blipp from 'blipp'

const start = async () => {
  try {
    await server.register(blipp)

    await server.start()
    console.log(`Server started ${server.info.uri}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
