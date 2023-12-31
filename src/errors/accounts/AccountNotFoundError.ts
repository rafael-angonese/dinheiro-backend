import AppError from '@/errors/AppError';
import { httpErrorCode } from '@/errors/http-error-code';
import { httpStatusCode } from '@/errors/http-status-code';

export class AccountNotFoundError extends AppError {
  constructor() {
    super(
      'Account not found',
      httpErrorCode.notFound.account,
      httpStatusCode.notFound,
    );
  }
}
