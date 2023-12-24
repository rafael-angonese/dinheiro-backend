import { RefreshTokensRepository } from '@/repositories/refresh-tokens-repository';

interface LogoutServiceRequest {
  userId: string;
}

export class LogoutService {
  constructor(private refreshTokensRepository: RefreshTokensRepository) {}

  async execute({ userId }: LogoutServiceRequest): Promise<void> {
    await this.refreshTokensRepository.invalidateByUserId(userId);
  }
}
