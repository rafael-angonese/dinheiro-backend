import { prismaClient } from "../../database/prismaClient";
import { compareHash } from "../../providers/crypto";
import { sign } from "../../providers/token";
import { CreateRefreshTokenService } from "./CreateRefreshTokenService";

type AuthRequest = {
    email: string;
    password: string;
};

interface AuthenticateServiceResponse {
    token: string;
    refreshToken: string;
}

const createRefreshToken = new CreateRefreshTokenService()

export class AuthenticateService {
    async execute(authParams: AuthRequest): Promise<Error | AuthenticateServiceResponse> {

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

        const refreshToken = await createRefreshToken.execute(user.id)

        if (refreshToken instanceof Error) {
            return new Error("User or Password incorrect");
        }

        const token = sign({ id: user.id, role: user.role })

        return {
            token,
            refreshToken: refreshToken.token
        };

    }
}
