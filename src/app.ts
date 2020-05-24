import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import root from './root';
import animals from './animals';
import doctors from './doctors';
import errorHandler from './common/utils/errorHandler';
import { errors as celebrateErrors } from 'celebrate';

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/', root);
app.use('/animals', animals);
app.use('/doctors', doctors);

app.use(celebrateErrors());
app.use(errorHandler);

export default app;
