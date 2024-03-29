import { NextFunction, Request, Response } from 'express';
import { JWTTokenMissingError } from '@/errors/auth/JWTTokenMissingError';
import { decodeJwt, verifyJwt } from '@/lib/jwt';

const authenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authorization = request.headers.authorization || '';

  if (!authorization) {
    throw new JWTTokenMissingError();
  }
  const token = authorization.replace('Bearer ', '');

  try {
    verifyJwt(token);

    const decodedToken = decodeJwt(token);

    if (decodedToken) {
      request.auth = decodedToken;
    }

    return next();
  } catch (err) {
    return response.status(401).end();
  }
};

export default authenticated;
