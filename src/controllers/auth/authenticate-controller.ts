import { PrismaRefreshTokensRepository } from '@/repositories/prisma/prisma-refresh-tokens-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateService } from '@/services/auth/authenticate-service';
import { authenticateValidator } from '@/validators/auth/authenticate-validator';
import { NextFunction, Request, Response } from 'express';

export async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = authenticateValidator.parse(request.body);

    const refreshTokensRepository = new PrismaRefreshTokensRepository();
    const usersRepository = new PrismaUsersRepository();

    const useCaseAuthenticate = new AuthenticateService(
      usersRepository,
      refreshTokensRepository,
    );

    const { token, refreshToken } = await useCaseAuthenticate.execute({
      email,
      password,
    });

    return response.json({
        token,
        refreshToken: refreshToken.token,
    });
  } catch (error) {
    next(error);
  }
}
