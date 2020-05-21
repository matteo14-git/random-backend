import { celebrate } from 'celebrate';
import { Router } from 'express';
import createAnimal from './middlewares/createAnimal';
import createAnimalSchema from './schemas/createAnimal.schema';
import updateAnimal from './middlewares/updateAnimal';
import deleteAnimal from './middlewares/deleteAnimal';
import getAnimalList from './middlewares/getAnimalList';
import updateAnimalSchema from './schemas/updateAnimal.schema';
import deleteAnimalSchema from './schemas/deleteAnimal.schema';

const router = Router();

router.get('/', getAnimalList);

router.post('/', celebrate(createAnimalSchema), createAnimal);

router.put('/:animalId', celebrate(updateAnimalSchema), updateAnimal);

router.delete('/:animalId', celebrate(deleteAnimalSchema), deleteAnimal);

export default router;
