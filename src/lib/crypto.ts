import { hash, compare } from "bcryptjs";

export async function generateHash(payload: string): Promise<string> {
    const result = await hash(payload, 8);
    return result
}

export async function compareHash(payload: string, hashed: string): Promise<boolean> {
    const passwordMatch = await compare(payload, hashed);
    return passwordMatch
}
