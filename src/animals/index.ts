import { celebrate } from 'celebrate';
import { Router } from 'express';
import createAnimal from './middlewares/createAnimal';
import createAnimalSchema from './schemas/createAnimal.schema';
import updateAnimal from './middlewares/updateAnimal';
import deleteAnimal from './middlewares/deleteAnimal';
import getAnimalList from './middlewares/getAnimalList';

const router = Router();

router.get('/', getAnimalList);

router.post('/', createAnimal);

router.put('/:animalId', updateAnimal);

router.delete('/:animalId', deleteAnimal);

export default router;
