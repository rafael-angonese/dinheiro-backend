import { prismaClient } from "../../database/prismaClient";
import { IncorrectEmailOrPasswordError } from "../../errors/auth/IncorrectEmailOrPasswordError";
import { UserNotFoundError } from "../../errors/users/UserNotFoundError";
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
    async execute(authParams: AuthRequest): Promise<AuthenticateServiceResponse> {

        const user = await prismaClient.user.findUnique({
            where: {
                email: authParams.email
            }
        })

        if (!user) {
            throw new UserNotFoundError();
        }

        const isMatch = await compareHash(authParams.password, user.password)
        if (!isMatch) {
            throw new IncorrectEmailOrPasswordError()
        }

        const refreshToken = await createRefreshToken.execute(user.id)

        if (!refreshToken) {
            throw new IncorrectEmailOrPasswordError()
        }

        const token = sign({ user_id: user.id, role: user.role })

        return {
            token,
            refreshToken: refreshToken.token
        };

    }
}
