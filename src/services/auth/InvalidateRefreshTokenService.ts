import { prismaClient } from "../../database/prismaClient";
import { RefreshTokenNotFoundError } from "../../errors/auth/RefreshTokenNotFoundError";

export class InvalidateRefreshTokenService {
  async execute(refreshTokenValue: string): Promise<void> {
    const refreshToken = await prismaClient.refreshToken.findFirst({
      where: {
        token: refreshTokenValue,
      },
    });

    if (!refreshToken) {
      throw new RefreshTokenNotFoundError();
    }

    await prismaClient.refreshToken.update({
      data: {
        valid: false,
      },
      where: {
        id: refreshToken.id,
      },
    });
  }
}
