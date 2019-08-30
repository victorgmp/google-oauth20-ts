import { config as configEnv } from 'dotenv';
import App from './app';
import database from './database';
// require our environment variables
configEnv();
// require database
database();

const start = async () => {
  const app = new App();
  await app.start();
};

start();
