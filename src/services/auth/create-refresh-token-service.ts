import authConfig from '@/config/auth.config';
import { generateRefreshToken } from '@/lib/jwt';
import { RefreshTokensRepository } from '@/repositories/refresh-tokens-repository';
import { RefreshToken } from '@prisma/client';

interface RefreshTokenServiceRequest {
  userId: string;
}

export class CreateRefreshTokenService {
  constructor(private refreshTokensRepository: RefreshTokensRepository) {}

  async execute({ userId }: RefreshTokenServiceRequest): Promise<RefreshToken> {
    const token = generateRefreshToken(userId);

    const expiresAt = new Date(Date.now() + authConfig.refreshToken.duration);

    const refreshToken = await this.refreshTokensRepository.create({
      userId,
      token,
      expiresAt,
      valid: true,
    });

    return refreshToken;
  }
}
