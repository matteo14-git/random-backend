import { Request, Response, NextFunction } from 'express';
import { getCollection, Collections } from '../../common/utils/Database';
import { serverError } from '../../common/utils/errors';

export default async (req: Request, res: Response, next: NextFunction) => {
  const options = req.query;

  const collection = getCollection(Collections.doctors);
  try {
    const doctors = await collection.find(options).toArray();

    res.send(doctors);
  } catch (err) {
    next(serverError('Error getting doctor list', err));
  }
};
