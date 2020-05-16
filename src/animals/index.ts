import { celebrate } from 'celebrate';
import { Router } from 'express';
import createAnimal from './middlewares/createAnimal';
import createAnimalSchema from './schemas/createAnimal.schema';
import updateAnimal from './middlewares/updateAnimal';
import deleteAnimal from './middlewares/deleteAnimal';

const router = Router();

router.get('/', (req, res) => {
  res.send({ text: 'Animals here!' });
});

// router.post('/', celebrate(createAnimalSchema), createAnimal);
router.post('/', createAnimal);

router.put('/:animalId', updateAnimal);

router.delete('/:animalId', deleteAnimal);

export default router;
