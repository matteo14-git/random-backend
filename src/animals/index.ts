import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Animals here!');
});

export default router;
