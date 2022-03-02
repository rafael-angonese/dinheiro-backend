import jwt, { SignOptions } from 'jsonwebtoken'
import authConfig from '../config/auth.config'

interface IPayloadProps {
    id: string;
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


export function generateRefreshToken(userId: string): string {

    const refreshToken = jwt.sign({ id: userId}, authConfig.refreshToken.secret, {
        expiresIn: authConfig.refreshToken.duration
    })

    return refreshToken
}
