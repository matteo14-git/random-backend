import express from 'express';
import bodyparser from 'body-parser';

import root from './root';
import animals from './animals';
import errorHandler from './common/utils/errorHandler';

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(errorHandler);

app.use('/', root);
app.use('/animals', animals);

export default app;
