import { Joi, Segments } from 'celebrate';
import { Genres } from '../interfaces/Animal';

export const createAnimalKeys = {
  name: Joi.string().required(),
  race: Joi.string().required(),
  genre: Joi.string()
    .valid(...Object.values(Genres))
    .required(),
  friends: Joi.array().items(
    Joi.object({
      surname: Joi.string().required(),
      name: Joi.string().required(),
      birth: Joi.date(),
      city: Joi.string(),
    }).required()
  ),
  favFoods: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      brand: Joi.string(),
    }).required()
  ),
};

const body = Joi.object().keys(createAnimalKeys).unknown(false).required();

export default { [Segments.BODY]: body };
