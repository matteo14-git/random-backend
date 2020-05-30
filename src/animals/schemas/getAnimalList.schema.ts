import { Segments, Joi } from 'celebrate';
import { createAnimalKeys } from './createAnimal.schema';

const body = Joi.array().items(Joi.object().keys(createAnimalKeys).required());

export default { [Segments.BODY]: body };
