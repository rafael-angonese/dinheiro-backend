import AppError from '@/errors/AppError';
import { InternalServerError } from '@/errors/InternalServerError';
import { NextFunction, Request, Response } from 'express';

const normalizeError = (error: Error) => {
  if (error instanceof AppError) {
    return error;
  }

  console.log({
    message: error.message,
    stackTrace: error.stack,
    level: 'fatal',
  });

  return new InternalServerError();
};

const errorHandler = (
  err: Error,
  req: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const error = normalizeError(err);
  const body = error.getBody();

  return response.status(error.statusCode).send({
    error: body,
  });
};

export default errorHandler;
