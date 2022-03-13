import jwt, { SignOptions } from 'jsonwebtoken';
import { IDecodedJwt } from '../@types/jwt/token';
import authConfig from '../config/auth.config';

interface IPayloadProps {
    user_id: string;
    role: string;
}

const signOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: authConfig.jwt.expiresIn,
}

export function sign(payload: IPayloadProps): string {

    const token = jwt.sign(payload, authConfig.jwt.privateKey, signOptions)

    return token
}

export function verify(token: string) {
    jwt.verify(token, authConfig.jwt.publicKey)
}

export function decode(token: string) {
    const decoded = jwt.decode(token)

    if (decoded) {
        return decoded as IDecodedJwt
    }
}


export function generateRefreshToken(userId: string): string {

    const refreshToken = jwt.sign({ user_id: userId }, authConfig.refreshToken.secret, {
        expiresIn: authConfig.refreshToken.duration
    })

    return refreshToken
}
