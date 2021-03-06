import { Segments, Joi } from 'celebrate';
import { Genres } from '../interfaces/Doctor';

export const createDoctorKeys = {
  surname: Joi.string().required(),
  name: Joi.string().required(),
  birth: Joi.date().required(),
  genre: Joi.string()
    .valid(...Object.values(Genres))
    .required(),
  city: Joi.string(),
};

const body = Joi.object().keys(createDoctorKeys).unknown(false).required();

export default { [Segments.BODY]: body };
