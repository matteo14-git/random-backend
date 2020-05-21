import express from 'express';
import bodyparser from 'body-parser';

import root from './root';
import animals from './animals';
import errorHandler from './common/utils/errorHandler';
import { errors as celebrateErrors } from 'celebrate';

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/', root);
app.use('/animals', animals);

app.use(celebrateErrors());
app.use(errorHandler);

export default app;
