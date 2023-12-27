export const httpErrorCode = {
  internalServerError: 'INTERNAL_SERVER_ERROR',
  forbiddenError: 'FORBIDDEN_ERROR',
  emailAlreadyInUse: 'EMAIL_ALREADY_IN_USE',
  notFound: {
    user: 'USER_NOT_FOUND',
    account: 'ACCOUNT_NOT_FOUND',
  },
};

type Keys = keyof typeof httpErrorCode;

export type HttpErrorCodeType = (typeof httpErrorCode)[Keys];
