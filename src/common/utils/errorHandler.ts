import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { message = '', status = 500 } = err || {};

  res.status(status).send({ message });
};

export default errorHandler;
