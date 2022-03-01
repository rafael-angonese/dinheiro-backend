import { prismaClient } from "../../database/prismaClient";
import { compareHash } from "../../providers/crypto";
import { sign } from "../../providers/token";

type AuthRequest = {
    email: string;
    password: string;
};

export class AuthenticateService {
    async execute(authParams: AuthRequest): Promise<Error | string> {

        const user = await prismaClient.user.findUnique({
            where: {
                email: authParams.email
            }
        })

        if (!user) {
            return new Error("User does not exists!");
        }

        const isMatch = await compareHash(authParams.password, user.password)
        if (!isMatch) {
            return new Error("User or Password incorrect");
        }

        const token = sign({ id: user.id, role: user.role })

        return token;

    }
}
