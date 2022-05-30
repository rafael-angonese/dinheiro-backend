import { RefreshToken } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { JWTInvalidTokenError } from "../../errors/auth/JWTInvalidTokenError";
import { RefreshTokenNotFoundError } from "../../errors/auth/RefreshTokenNotFoundError";
import { UserNotFoundError } from "../../errors/users/UserNotFoundError";
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

const createRefreshToken = new CreateRefreshTokenService();
const invalidateRefreshTokenService = new InvalidateRefreshTokenService();

const isRefreshTokenValid = (refreshToken: RefreshToken | null): boolean => {
  if (
    refreshToken &&
    refreshToken.valid &&
    refreshToken.expiresAt >= new Date(Date.now())
  ) {
    return true;
  }
  return false;
};

export class RefreshTokenService {
  async execute(
    refreshTokenParams: RefreshTokenRequest
  ): Promise<RefreshTokenServiceResponse> {
    const refreshTokenObject = await prismaClient.refreshToken.findFirst({
      where: {
        token: refreshTokenParams.refreshToken,
      },
    });

    if (!refreshTokenObject) {
      throw new RefreshTokenNotFoundError();
    }

    if (!isRefreshTokenValid(refreshTokenObject)) {
      throw new JWTInvalidTokenError();
    }

    await invalidateRefreshTokenService.execute(
      refreshTokenParams.refreshToken
    );

    const user = await prismaClient.user.findUnique({
      where: {
        id: refreshTokenObject.userId,
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const refreshToken = await createRefreshToken.execute(user.id);

    const token = sign({ user_id: user.id, role: user.role });

    return {
      token,
      refreshToken: refreshToken.token,
    };
  }
}
