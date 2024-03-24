import { authConfig } from '@/constants/auth-config';
import { JWTInvalidTokenError } from '@/errors/auth/JWTInvalidTokenError';
import { UserNotFoundError } from '@/errors/users/UserNotFoundError';
import { generateRefreshToken, jwtSign } from '@/lib/jwt';
import { RefreshTokensRepository } from '@/repositories/refresh-tokens-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { RefreshToken, User } from '@prisma/client';

interface RefreshTokenServiceRequest {
  token: string;
}

interface RefreshTokenServiceResponse {
  user: User;
  token: string;
  refreshToken: RefreshToken;
}

const isRefreshTokenValid = (refreshToken: RefreshToken): boolean => {
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
  constructor(
    private usersRepository: UsersRepository,
    private refreshTokensRepository: RefreshTokensRepository,
  ) {}

  async execute({
    token,
  }: RefreshTokenServiceRequest): Promise<RefreshTokenServiceResponse> {
    const refreshToken = await this.refreshTokensRepository.findByToken(token);

    if (!refreshToken) {
      throw new JWTInvalidTokenError();
    }

    if (!isRefreshTokenValid(refreshToken)) {
      throw new JWTInvalidTokenError();
    }

    const user = await this.usersRepository.findById(refreshToken.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.refreshTokensRepository.update(refreshToken.id, {
      valid: false,
    });

    const newToken = jwtSign({ userId: user.id });

    const generatedRefreshToken = generateRefreshToken(user.id);

    const expiresAt = new Date(Date.now() + authConfig.refreshToken.duration);

    const newRefreshToken = await this.refreshTokensRepository.create({
      userId: user.id,
      token: generatedRefreshToken,
      expiresAt,
      valid: true,
    });

    return {
      user,
      token: newToken,
      refreshToken: newRefreshToken,
    };
  }
}
