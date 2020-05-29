import { Segments, Joi } from 'celebrate';
import { createAnimalKeys } from './createAnimal.schema';

export const params = Joi.object()
  .keys({
    animalId: Joi.string().length(24),
  })
  .required();

const body = Joi.object().keys(createAnimalKeys).unknown(false).required();

export default { [Segments.BODY]: body, [Segments.PARAMS]: params };
