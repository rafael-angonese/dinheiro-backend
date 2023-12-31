import { UserNotFoundError } from '@/errors/users/UserNotFoundError';
import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface UpdateUserServiceRequest {
  name?: string;
  email?: string;
  role?: string;
}

interface UpdateUserServiceResponse {
  user: User;
}

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    id: string,
    { email, name, role }: UpdateUserServiceRequest,
  ): Promise<UpdateUserServiceResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const updatedUser = await this.usersRepository.update(id, {
      name,
      email,
      role,
    });

    return {
      user: updatedUser,
    };
  }
}
