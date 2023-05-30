import { server } from './server'
import blipp from 'blipp'
import Jwt from '@hapi/jwt';
import cors from 'hapi-cors';
import { env } from './env';

const start = async () => {
  try {
    await server.register(Jwt);

    await server.register({ plugin: cors });

    console.log('v1: ', env.JWT_SECRET)
    server.auth.strategy('jwt', 'jwt', {
      keys: env.JWT_SECRET,
      verify: {
        aud: false,
        iss: false,
        sub: false,
        nbf: true,
        exp: true,
        maxAgeSec: 14400,
        timeSkewSec: 15
      },
      validate: () => {
        return { isValid: true };
      }
    });

    server.auth.default('jwt');

    await server.register(blipp)

    await server.start()
    console.log(`Server started ${server.info.uri}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
