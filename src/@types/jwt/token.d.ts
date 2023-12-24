import { JwtPayload } from 'jsonwebtoken';

export interface IDecodedJwt extends JwtPayload {
  user_id: string;
  role: string;
  iat: number;
  exp: number;
}
