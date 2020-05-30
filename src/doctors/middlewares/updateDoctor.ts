import { Request, Response, NextFunction } from 'express';
import { Doctors } from '../interfaces/Doctor';
import { serverError, notFound } from '../../common/utils/errors';
import { getCollection, Collections } from '../../common/utils/Database';
import { ObjectId } from 'mongodb';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { doctorId } = req.params;
  const doctor: Doctors = req.body;

  const collection = getCollection(Collections.doctors);
  try {
    const { value } = await collection.findOneAndUpdate(
      {
        _id: new ObjectId(doctorId),
      },
      {
        $set: {
          ...doctor,
        },
      },
      { returnOriginal: false }
    );

    if (!value) return next(notFound('Doctor not found'));

    res.send(value);
  } catch (err) {
    next(serverError('Error updating doctor'));
  }
};
