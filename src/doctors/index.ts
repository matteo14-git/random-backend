import { Router } from 'express';
import createDoctor from './middlewares/createDoctor';

const router = Router();

router.get('/', (req, res) => {
  res.send('Docs here');
});

router.post('/', createDoctor);

export default router;
