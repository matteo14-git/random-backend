import { Request, Response, NextFunction } from 'express';
import { getCollection, Collections } from '../../common/utils/Database';
import { ObjectId } from 'mongodb';
import { notFound, serverError } from '../../common/utils/errors';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { animalId } = req.params;

  const collection = getCollection(Collections.animals);
  try {
    const { value } = await collection.findOneAndDelete({
      _id: new ObjectId(animalId),
    });

    if (!value) return next(notFound('Animal not found'));

    res.send(value);
  } catch (err) {
    next(serverError('Error deleting animal', err));
  }
};
