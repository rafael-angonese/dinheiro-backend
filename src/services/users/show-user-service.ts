import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { UserNotFoundError } from '../../errors/users/UserNotFoundError';

interface ShowUserServiceRequest {
  id: string;
}

interface ShowUserServiceResponse {
  user: User;
}

export class ShowUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: ShowUserServiceRequest): Promise<ShowUserServiceResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      user: user,
    };
  }
}
