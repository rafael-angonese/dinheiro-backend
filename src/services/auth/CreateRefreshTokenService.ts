import { RefreshToken } from "@prisma/client";
import authConfig from "../../config/auth.config";
import { prismaClient } from "../../database/prismaClient";
import { generateRefreshToken } from "../../providers/token";

export class CreateRefreshTokenService {
  async execute(userId: string): Promise<RefreshToken> {
    const token = generateRefreshToken(userId);

    const expiresAt = new Date(Date.now() + authConfig.refreshToken.duration);

    const refreshToken = await prismaClient.refreshToken.create({
      data: {
        userId: userId,
        token: token,
        expiresAt,
        valid: true,
      },
    });

    return refreshToken;
  }
}
