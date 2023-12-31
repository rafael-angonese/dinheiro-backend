import AppError from '@/errors/AppError';
import { httpErrorCode } from '@/errors/http-error-code';
import { httpStatusCode } from '@/errors/http-status-code';

export class BankAccountNotFoundError extends AppError {
  constructor() {
    super(
      'Bank Account not found',
      httpErrorCode.notFound.bankAccount,
      httpStatusCode.notFound,
    );
  }
}
