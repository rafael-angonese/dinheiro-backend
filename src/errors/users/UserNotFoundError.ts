import AppError from '@/errors/AppError';
import { httpErrorCode } from '@/errors/http-error-code';
import { httpStatusCode } from '@/errors/http-status-code';

export class UserNotFoundError extends AppError {
  constructor() {
    super(
      'User not found',
      httpErrorCode.notFound.user,
      httpStatusCode.notFound,
    );
  }
}
