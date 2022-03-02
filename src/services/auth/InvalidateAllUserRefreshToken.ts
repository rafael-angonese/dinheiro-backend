import { prismaClient } from "../../database/prismaClient";

export class InvalidateAllUserRefreshToken {
    async execute(refreshTokenValue: string): Promise<Error | void> {

        const refreshToken = await prismaClient.refreshToken.findFirst({
            where: {
                token: refreshTokenValue
            }
        })

        if (!refreshToken) {
            return new Error("RefreshToken not found");
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
