import { RefreshTokensRepository } from '@/repositories/refresh-tokens-repository';
import { RefreshToken } from '@prisma/client';
import { RefreshTokenNotFoundError } from '../../errors/auth/RefreshTokenNotFoundError';

interface InvalidateRefreshTokenServiceRequest {
  token: string;
}

interface InvalidateRefreshTokenServiceResponse {
  refreshToken: RefreshToken;
}

export class InvalidateRefreshTokenService {
  constructor(private refreshTokensRepository: RefreshTokensRepository) {}

  async execute({
    token,
  }: InvalidateRefreshTokenServiceRequest): Promise<InvalidateRefreshTokenServiceResponse> {
    const refreshToken = await this.refreshTokensRepository.findByToken(token);

    if (!refreshToken) {
      throw new RefreshTokenNotFoundError();
    }

    const refreshTokenUpdated = await this.refreshTokensRepository.update(
      refreshToken.id,
      {
        valid: false,
      },
    );

    return {
      refreshToken: refreshTokenUpdated,
    };
  }
}
