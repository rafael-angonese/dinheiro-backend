import { IDecodedJwt } from '@/@types/jwt/token';

declare global {
  namespace Express {
    export interface Request {
      auth: IDecodedJwt;
    }
  }
}
