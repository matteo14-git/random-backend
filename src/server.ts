import app from './app';
import { Database } from './common/utils/Database';

app.listen(4000, async (err) => {
  if (err) console.log(err);
  console.log('App listening on 4000');

  try {
    await Database.connect();
    console.info('Connected to Mongo!');
  } catch (err) {
    console.error('Error connecting to Mongo!', err);
  }
});
