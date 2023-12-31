import AppError from '@/errors/AppError';
import { httpErrorCode } from '@/errors/http-error-code';
import { httpStatusCode } from '@/errors/http-status-code';

export class ForbiddenError extends AppError {
  constructor() {
    super(
      'Forbidden Error.',
      httpErrorCode.forbiddenError,
      httpStatusCode.forbidden,
    );
  }
}
