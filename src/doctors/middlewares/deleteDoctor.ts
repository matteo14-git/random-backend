import { Request, Response, NextFunction } from 'express';
import { getCollection, Collections } from '../../common/utils/Database';
import { serverError, notFound } from '../../common/utils/errors';
import { ObjectId } from 'mongodb';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { doctorId } = req.params;

  const collection = getCollection(Collections.doctors);
  try {
    const { value } = await collection.findOneAndDelete({
      _id: new ObjectId(doctorId),
    });

    if (!value) return next(notFound());

    res.send(200);
  } catch (err) {
    next(serverError('Error deleting doctor', err));
  }
};
