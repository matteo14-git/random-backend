import { Request, Response, NextFunction } from 'express';
import { getCollection, Collections } from '../../common/utils/Database';
import { serverError } from '../../common/utils/errors';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collection = getCollection(Collections.animals);

    const animals = await collection.find().toArray();

    res.send(animals);
  } catch (err) {
    return next(serverError('Error getting animals list'));
  }
};
