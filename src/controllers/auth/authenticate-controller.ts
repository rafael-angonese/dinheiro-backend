import { jwtSign } from '@/lib/jwt';
import { PrismaRefreshTokensRepository } from '@/repositories/prisma/prisma-refresh-tokens-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateService } from '@/services/auth/authenticate-service';
import { CreateRefreshTokenService } from '@/services/auth/create-refresh-token-service';
import { authenticateValidator } from '@/validators/auth/authenticate-validator';
import { NextFunction, Request, Response } from 'express';

export async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = authenticateValidator.parse(request.body);

    const usersRepository = new PrismaUsersRepository();
    const useCaseAuthenticate = new AuthenticateService(usersRepository);

    const { user } = await useCaseAuthenticate.execute({ email, password });

    const token = jwtSign({ user_id: user.id, role: user.role });

    const refreshTokensRepository = new PrismaRefreshTokensRepository();
    const useCaseRefreshToken = new CreateRefreshTokenService(
      refreshTokensRepository,
    );

    const refreshToken = await useCaseRefreshToken.execute({
      userId: user.id,
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
