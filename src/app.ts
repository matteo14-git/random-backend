import express from 'express';

import root from './root';
import animals from './animals';

const app = express();

app.use('/', root);
app.use('/animals', animals);

export default app;
