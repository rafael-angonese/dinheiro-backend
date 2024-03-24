import { UserAlreadyExistsError } from '@/errors/users/UserAlreadyExistsError';
import { generateHash } from '@/lib/crypto';
import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface CreateUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserServiceResponse {
  user: User;
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return {
      user,
    };
  }
}
