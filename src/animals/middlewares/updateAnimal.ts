import { Request, Response, NextFunction } from 'express';
import { getCollection, Collections } from '../../common/utils/Database';
import { ObjectId } from 'mongodb';
import { Animals } from '../interfaces/Animal';
import { notFound } from '../../common/utils/errors';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { animalId } = req.params;
  const animal: Animals = req.body;

  try {
    const collection = getCollection(Collections.animals);

    const { value } = await collection.findOneAndUpdate(
      {
        _id: new ObjectId(animalId),
      },
      {
        $set: {
          ...animal,
        },
      },
      { returnOriginal: false }
    );

    if (!value) return next(notFound('Animal not found'));

    res.send(value);
  } catch (err) {
    throw new Error(err);
  }
};
