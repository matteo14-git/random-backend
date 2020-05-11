import { Request, Response, NextFunction } from 'express';
import { Collections, getCollection } from '../../common/utils/Database';
import { Animals } from '../interfaces/Animal';

export default async (req: Request, res: Response, next: NextFunction) => {
  const animal: Animals = {
    ...req.body,
  };

  try {
    const collection = getCollection(Collections.animals);

    const { ops } = await collection.insertOne(animal);

    const insertedAnimal = ops[0];

    res.send(insertedAnimal);
  } catch (err) {
    throw new Error(err);
  }
};
