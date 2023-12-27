import AppError from '@/errors/AppError';
import { InternalServerError } from '@/errors/InternalServerError';
import { httpStatusCode } from '@/errors/http-status-code';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

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
  if (err instanceof ZodError) {
    return response.status(httpStatusCode.badRequest).send({
      data: {
        message: 'Validation error.',
        statusCode: httpStatusCode.badRequest,
        error: err,
      },
    });
  }

  const error = normalizeError(err);
  const body = error.getBody();

  return response.status(error.statusCode).send({
    data: body,
  });
};

export default errorHandler;
