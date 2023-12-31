import AppError from '@/errors/AppError';
import { httpErrorCode } from '@/errors/http-error-code';
import { httpStatusCode } from '@/errors/http-status-code';

export class CategoryNotFoundError extends AppError {
  constructor() {
    super(
      'Category not found',
      httpErrorCode.notFound.category,
      httpStatusCode.notFound,
    );
  }
}
