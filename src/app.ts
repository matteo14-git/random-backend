import express from 'express';
import bodyparser from 'body-parser';

import root from './root';
import animals from './animals';

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.use('/', root);
app.use('/animals', animals);

export default app;
