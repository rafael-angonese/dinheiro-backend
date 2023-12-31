import { PrismaRefreshTokensRepository } from '@/repositories/prisma/prisma-refresh-tokens-repository';
import { LogoutService } from '@/services/auth/logout-service';
import { NextFunction, Request, Response } from 'express';

export async function logout(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const refreshTokensRepository = new PrismaRefreshTokensRepository();
    const useCaseLogout = new LogoutService(refreshTokensRepository);

    const { user_id } = request.auth;

    await useCaseLogout.execute({ userId: user_id });

    return response.send();
  } catch (error) {
    next(error);
  }
}
