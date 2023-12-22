import AppError from '@/errors/AppError';
import { httpErrorCode } from '@/errors/http-error-code';
import { httpStatusCode } from '@/errors/http-status-code';

export class InternalServerError extends AppError {
  constructor() {
    super(
      'Internal Server Error.',
      httpErrorCode.internalServerError,
      httpStatusCode.internalServerError,
    );
  }
}
