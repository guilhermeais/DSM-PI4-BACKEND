import { server } from './server';

export const start = async () => {
  try {
    await server.start();
    console.log(`Server started ${server.info.uri}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();