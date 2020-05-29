import { createDoctorKeys } from './createDoctor.schema';
import { Joi, Segments } from 'celebrate';

const updateDoctorKeys = {
  ...createDoctorKeys,
  _id: Joi.any().strip(),
};

export const params = Joi.object()
  .keys({
    doctorId: Joi.string().length(24),
  })
  .required();

const body = Joi.object().keys(updateDoctorKeys).unknown(false).required();

export default { [Segments.BODY]: body, [Segments.PARAMS]: params };
