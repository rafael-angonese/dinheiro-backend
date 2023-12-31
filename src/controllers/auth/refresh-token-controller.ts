import { PrismaRefreshTokensRepository } from '@/repositories/prisma/prisma-refresh-tokens-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { RefreshTokenService } from '@/services/auth/refresh-token-service';
import { refreshTokenValidator } from '@/validators/auth/refresh-token-validator';
import { NextFunction, Request, Response } from 'express';

export async function refreshToken(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { refreshToken: refreshTokenBody } = refreshTokenValidator.parse(
      request.body,
    );

    const refreshTokensRepository = new PrismaRefreshTokensRepository();
    const usersRepository = new PrismaUsersRepository();

    const useCase = new RefreshTokenService(
      usersRepository,
      refreshTokensRepository,
    );

    const { token, refreshToken } = await useCase.execute({
      token: refreshTokenBody,
    });

    return response.json({
      data: {
        token,
        refreshToken: refreshToken.token,
      },
    });
  } catch (error) {
    next(error);
  }
}
