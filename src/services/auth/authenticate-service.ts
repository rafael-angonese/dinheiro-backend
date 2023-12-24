import authConfig from '@/config/auth.config';
import { InvalidCredentialsError } from '@/errors/auth/InvalidCredentialsError';
import { compareHash } from '@/lib/crypto';
import { generateRefreshToken, jwtSign } from '@/lib/jwt';
import { RefreshTokensRepository } from '@/repositories/refresh-tokens-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { RefreshToken, User } from '@prisma/client';

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
  token: string;
  refreshToken: RefreshToken;
}

export class AuthenticateService {
  constructor(
    private usersRepository: UsersRepository,
    private refreshTokensRepository: RefreshTokensRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isMatch = await compareHash(password, user.password);
    if (!isMatch) {
      throw new InvalidCredentialsError();
    }

    const token = jwtSign({ user_id: user.id, role: user.role });

    const generatedRefreshToken = generateRefreshToken(user.id);

    const expiresAt = new Date(Date.now() + authConfig.refreshToken.duration);

    const refreshToken = await this.refreshTokensRepository.create({
      userId: user.id,
      token: generatedRefreshToken,
      expiresAt,
      valid: true,
    });

    return {
      user,
      token,
      refreshToken,
    };
  }
}
