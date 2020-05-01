import express from 'express';
import { Database } from './common/utils/Database';

import root from './root';

const app = express();

app.use('/', root);

app.listen(3000, async (err) => {
  if (err) console.log(err);
  console.log('App listening on 3000');

  try {
    await Database.connect();
    console.info('Connected to Mongo!');
  } catch (err) {
    console.error('Error connecting to Mongo!', err);
  }
});
