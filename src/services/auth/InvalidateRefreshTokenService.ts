import { prismaClient } from "../../database/prismaClient";

export class InvalidateRefreshTokenService {
    async execute(refreshTokenValue: string): Promise<Error | void> {

        const refreshToken = await prismaClient.refreshToken.findFirst({
            where: {
                token: refreshTokenValue
            }
        })

        if (!refreshToken) {
            return new Error("RefreshToken not found");
        }

        await prismaClient.refreshToken.update({
            data: {
                valid: false
            },
            where: {
                id: refreshToken.id
            }
        })

    }
}
