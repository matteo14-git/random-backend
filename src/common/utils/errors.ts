import { ErrorWithStatus } from '../interfaces/ErrorWithStatus';

export const notFound = (message?: string) => {
  const error = new ErrorWithStatus(message);
  error.status = 404;
  return error;
};
