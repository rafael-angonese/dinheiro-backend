import jwt from 'jsonwebtoken'

interface IPayloadProps {
    id: string;
    role: string;
}

export async function sign(payload: IPayloadProps): Promise<string> {

    const token = jwt.sign(payload, 'secret')

    return token
}

export function verify(token: string) {
    jwt.verify(token, 'secret')
}
