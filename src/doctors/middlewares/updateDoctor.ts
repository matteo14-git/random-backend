import { Request, Response, NextFunction } from 'express';
import { serverError, notFound } from '../../common/utils/errors';
import { getCollection, Collections } from '../../common/utils/Database';
import { ObjectId } from 'mongodb';
import { Doctors } from '../interfaces/Doctor';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { doctorId } = req.params;
  const doctor: Doctors = req.body;
  try {
    const collection = getCollection(Collections.doctors);
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
