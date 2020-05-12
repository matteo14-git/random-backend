import { Request, Response, NextFunction } from 'express';
import { getCollection, Collections } from '../../common/utils/Database';
import { ObjectId } from 'mongodb';
import { Animals } from '../interfaces/Animal';

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log('params', req.params);
  const { animalId } = req.params;
  const animal: Animals = req.body;
  console.log('body', animal);

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

    if (!value) return 'ppp';

    res.send(value);
  } catch (err) {
    throw new Error(err);
  }
};
