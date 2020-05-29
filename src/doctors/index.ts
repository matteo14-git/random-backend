import { Router } from 'express';
import createDoctor from './middlewares/createDoctor';
import createDoctorSchema from './schemas/createDoctor.schema';
import { celebrate } from 'celebrate';
import updateDoctor from './middlewares/updateDoctor';
import updateDoctorSchema from './schemas/updateDoctor.schema';

const router = Router();

router.get('/', (req, res) => {
  res.send('Docs here');
});

router.post('/', celebrate(createDoctorSchema), createDoctor);

export default router;
