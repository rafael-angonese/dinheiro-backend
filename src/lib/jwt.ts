import { IDecodedJwt } from '@/@types/jwt/token';
import { authConfig } from '@/constants/auth-config';
import jwt, { SignOptions } from 'jsonwebtoken';

interface IPayloadProps {
  userId: string;
}

const signOptions: SignOptions = {
  algorithm: 'RS256',
  expiresIn: authConfig.jwt.expiresIn,
};

export function jwtSign(payload: IPayloadProps): string {
  const token = jwt.sign(payload, authConfig.jwt.privateKey, signOptions);

  return token;
}

export function verifyJwt(token: string) {
  jwt.verify(token, authConfig.jwt.publicKey);
}

export function decodeJwt(token: string) {
  const decoded = jwt.decode(token);

  if (decoded) {
    return decoded as IDecodedJwt;
  }
}

export function generateRefreshToken(userId: string): string {
  const refreshToken = jwt.sign(
    { user_id: userId },
    authConfig.refreshToken.secret,
    {
      expiresIn: authConfig.refreshToken.duration,
    },
  );

  return refreshToken;
}
