import { UsersRepository } from '@/repositories/users-repository';
import { excludeUserPasswordField } from '@/utils/exclude-user-password-field';
import { User } from '@prisma/client';

interface ListUserServiceRequest {
  query: string;
  page: number;
}

interface ListUserServiceResponse {
  users: Omit<User, 'password'>[];
}

export class ListUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
    query,
  }: ListUserServiceRequest): Promise<ListUserServiceResponse> {
    const users = await this.usersRepository.list(query, page);

    const usersWithoutPassword = users.map((user) =>
      excludeUserPasswordField(user),
    );

    return {
      users: usersWithoutPassword,
    };
  }
}
