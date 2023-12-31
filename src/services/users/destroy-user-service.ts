import { UserNotFoundError } from '@/errors/users/UserNotFoundError';
import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface DestroyUserServiceRequest {
  id: string;
}

interface DestroyUserServiceResponse {
  user: User | null;
}

export class DestroyUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: DestroyUserServiceRequest): Promise<DestroyUserServiceResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.usersRepository.destroy(id);

    return {
      user,
    };
  }
}
