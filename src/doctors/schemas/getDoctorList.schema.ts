import { Segments, Joi } from 'celebrate';
import { Genres } from '../interfaces/Doctor';

const query = Joi.object()
  .keys({
    genre: Joi.string().valid(...Object.values(Genres)),
  })
  .required();

export default { [Segments.QUERY]: query };
