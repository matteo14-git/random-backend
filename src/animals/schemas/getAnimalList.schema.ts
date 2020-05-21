import { Segments, Joi } from 'celebrate';
import { updateAnimalKeys } from './updateAnimal.schema';

const body = Joi.array().items(Joi.object().keys(updateAnimalKeys).required());

export default { [Segments.BODY]: body };
