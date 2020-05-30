import { ErrorWithStatus } from '../interfaces/ErrorWithStatus';

export const badRequest = (message: string = 'Bad request') => {
  const error = new ErrorWithStatus(message);
  error.status = 400;
  return error;
};

export const notFound = (message: string = 'Not found') => {
  const error = new ErrorWithStatus(message);
  error.status = 404;
  return error;
};

export const serverError = (message?: string, errorObj?: any) => {
  const error = new ErrorWithStatus(message);
  error.status = 500;
  error.stack = errorObj;
  return error;
};
