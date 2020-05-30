import { Request, Response, NextFunction } from 'express';
import { getCollection, Collections } from '../../common/utils/Database';
import { serverError } from '../../common/utils/errors';
import { Doctors } from '../interfaces/Doctor';

export default async (req: Request, res: Response, next: NextFunction) => {
  const doctor: Doctors = {
    ...req.body,
  };
  const collection = getCollection(Collections.doctors);

  try {
    const { ops } = await collection.insertOne(doctor);
    const insertedDoctor = ops[0];
    res.send(insertedDoctor);
  } catch (err) {
    next(serverError('Error in creating doctor'));
  }
};
