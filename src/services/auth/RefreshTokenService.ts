import { RefreshToken } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { sign } from "../../providers/token";
import { CreateRefreshTokenService } from "./CreateRefreshTokenService";
import { InvalidateRefreshTokenService } from "./InvalidateRefreshTokenService";

type RefreshTokenRequest = {
    refreshToken: string;
};

interface RefreshTokenServiceResponse {
    token: string;
    refreshToken: string;
}

const createRefreshToken = new CreateRefreshTokenService()
const invalidateRefreshTokenService = new InvalidateRefreshTokenService()

const isRefreshTokenValid = (refreshToken: RefreshToken | null): boolean => {
    if (refreshToken && refreshToken.valid && refreshToken.expiresAt >= new Date(Date.now())) {
        return true
    }
    return false
}

export class RefreshTokenService {
    async execute(refreshTokenParams: RefreshTokenRequest): Promise<Error | RefreshTokenServiceResponse> {

        const refreshTokenObject = await prismaClient.refreshToken.findFirst({
            where: {
                token: refreshTokenParams.refreshToken
            }
        })

        if (refreshTokenObject && isRefreshTokenValid(refreshTokenObject)) {

            await invalidateRefreshTokenService.execute(refreshTokenParams.refreshToken)

            const user = await prismaClient.user.findUnique({
                where: {
                    id: refreshTokenObject.userId
                }
            })

            if (!user) {
                return new Error("User not found");
            }

            const refreshToken = await createRefreshToken.execute(user.id)

            if (refreshToken instanceof Error) {
                return new Error("Failed to create refresh token");
            }

            const token = sign({ user_id: user.id, role: user.role })

            return {
                token,
                refreshToken: refreshToken.token
            };
        }
        return new Error("Failed to create refresh token");
    }
}
