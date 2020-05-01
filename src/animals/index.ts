import { Router } from 'express';
import createAnimal from './middlewares/createAnimal';

const router = Router();

router.get('/', (req, res) => {
  res.send({ text: 'Animals here!' });
});

router.post('/', createAnimal);

export default router;
