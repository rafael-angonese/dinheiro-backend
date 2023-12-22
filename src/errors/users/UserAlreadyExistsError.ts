import AppError from '@/errors/AppError';
import { httpErrorCode } from '@/errors/http-error-code';
import { httpStatusCode } from '@/errors/http-status-code';

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super(
      'E-mail already exists.',
      httpErrorCode.emailAlreadyInUse,
      httpStatusCode.conflict,
    );
  }
}
