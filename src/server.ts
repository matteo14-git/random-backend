import './common/utils/loadenv';
import app from './app';
import { Database } from './common/utils/Database';

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, async () => {
  console.log('App listening on 4000');

  try {
    await Database.connect();
    console.info('Connected to Mongo!');
  } catch (err) {
    console.error('Error connecting to Mongo!', err);
  }
});
