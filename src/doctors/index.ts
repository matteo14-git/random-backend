import { Router } from 'express';
import createDoctor from './middlewares/createDoctor';
import createDoctorSchema from './schemas/createDoctor.schema';
import { celebrate } from 'celebrate';
import updateDoctor from './middlewares/updateDoctor';

const router = Router();

router.get('/', (req, res) => {
  res.send('Docs here');
});

router.post('/', celebrate(createDoctorSchema), createDoctor);

router.put('/:doctorId', updateDoctor);

export default router;
