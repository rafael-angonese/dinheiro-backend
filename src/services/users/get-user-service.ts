import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { UserNotFoundError } from '../../errors/users/UserNotFoundError';

interface GetUserServiceRequest {
  id: string;
}

interface GetUserServiceResponse {
  user: User;
}

export class GetUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserServiceRequest): Promise<GetUserServiceResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      user: user,
    };
  }
}
