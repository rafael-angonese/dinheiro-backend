import { InvalidCredentialsError } from '@/errors/auth/InvalidCredentialsError';
import { compareHash } from '@/lib/crypto';
import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

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

    return {
      user,
    };
  }
}
