import { Request, Response, NextFunction } from 'express';
import { Database, Collections } from '../../common/utils/Database';

export default async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  console.log('body', body);

  res.sendStatus(400);
};
