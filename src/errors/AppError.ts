import { HttpErrorCodeType } from '@/errors/http-error-code';
import { HttpStatusCodeType } from '@/errors/http-status-code';

export default class AppError extends Error {
  public readonly errorCode: HttpErrorCodeType;
  public readonly statusCode: HttpStatusCodeType;

  constructor(
    message: string,
    errorCode: HttpErrorCodeType,
    statusCode: HttpStatusCodeType,
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }

  getBody() {
    return {
      message: this.message,
      errorCode: this.errorCode,
      statusCode: this.statusCode,
    };
  }
}
