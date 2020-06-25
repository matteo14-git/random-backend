import { celebrate } from 'celebrate';
import { Router } from 'express';
import createAnimal from './middlewares/createAnimal';
import createAnimalSchema from './schemas/createAnimal.schema';
import updateAnimal from './middlewares/updateAnimal';
import deleteAnimal from './middlewares/deleteAnimal';
import getAnimalList from './middlewares/getAnimalList';
import updateAnimalSchema from './schemas/updateAnimal.schema';
import deleteAnimalSchema from './schemas/deleteAnimal.schema';
import getAnimalListSchema from './schemas/getAnimalList.schema';
import getStops from './middlewares/getStops';
import makeTrips from './middlewares/makeTrips';

const router = Router();

router.get('/', celebrate(getAnimalListSchema), getAnimalList);

router.post('/', celebrate(createAnimalSchema), createAnimal);

router.put('/:animalId', celebrate(updateAnimalSchema), updateAnimal);

router.delete('/:animalId', celebrate(deleteAnimalSchema), deleteAnimal);

router.get('/stops', getStops);

router.get('/trips', makeTrips);

export default router;
