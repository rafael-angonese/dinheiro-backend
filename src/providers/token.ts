import jwt, { SignOptions } from 'jsonwebtoken'

interface IPayloadProps {
    id: string;
    role: string;
}

const signOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '7d',
}

const publicKey = process.env.JWT_PUBLIC_KEY || ""
const privateKey = process.env.JWT_PRIVATE_KEY || ""

export async function sign(payload: IPayloadProps): Promise<string> {

    const token = jwt.sign(payload, privateKey, signOptions)

    return token
}

export function verify(token: string) {
    jwt.verify(token, publicKey)
}
