export enum httpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  unprocessableEntity = 422,
  internalServerError = 500,
}

type Keys = keyof typeof httpStatusCode;

export type HttpStatusCodeType = (typeof httpStatusCode)[Keys];
