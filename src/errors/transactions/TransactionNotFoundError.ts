import AppError from '@/errors/AppError';
import { httpErrorCode } from '@/errors/http-error-code';
import { httpStatusCode } from '@/errors/http-status-code';

export class TransactionNotFoundError extends AppError {
  constructor() {
    super(
      'Transaction not found',
      httpErrorCode.notFound.transaction,
      httpStatusCode.notFound,
    );
  }
}
