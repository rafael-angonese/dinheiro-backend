import { JwtPayload } from 'jsonwebtoken';

export interface IDecodedJwt extends JwtPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}
