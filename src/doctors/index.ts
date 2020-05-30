import { Router } from 'express';
import createDoctor from './middlewares/createDoctor';
import createDoctorSchema from './schemas/createDoctor.schema';
import { celebrate } from 'celebrate';
import updateDoctor from './middlewares/updateDoctor';
import updateDoctorSchema from './schemas/updateDoctor.schema';
import deleteDoctor from './middlewares/deleteDoctor';
import deleteDoctorSchema from './schemas/deleteDoctor.schema';
import getDoctorList from './middlewares/getDoctorList';

const router = Router();

router.get('/', getDoctorList);

router.post('/', celebrate(createDoctorSchema), createDoctor);

router.put('/:doctorId', celebrate(updateDoctorSchema), updateDoctor);

router.delete('/:doctorId', celebrate(deleteDoctorSchema), deleteDoctor);

export default router;
