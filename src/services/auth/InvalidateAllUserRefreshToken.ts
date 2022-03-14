import { prismaClient } from "../../database/prismaClient";
import { RefreshTokenNotFoundError } from "../../errors/auth/RefreshTokenNotFoundError";

export class InvalidateAllUserRefreshToken {
    async execute(refreshTokenValue: string): Promise<void> {

        const refreshToken = await prismaClient.refreshToken.findFirst({
            where: {
                token: refreshTokenValue
            }
        })

        if (!refreshToken) {
            throw new RefreshTokenNotFoundError()
        }

        await prismaClient.refreshToken.updateMany({
            data: {
                valid: false
            },
            where: {
                userId: refreshToken.userId
            }
        })

    }
}
