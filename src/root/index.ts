import { Router } from 'express';
import root from './middlewares/root';

const router = Router();

router.get('/', root);

export default router;
