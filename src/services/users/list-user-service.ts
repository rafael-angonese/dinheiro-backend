import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface ListUserServiceRequest {
  query?: string;
  page: number;
}

interface ListUserServiceResponse {
  users: User[];
}

export class ListUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
    query = '',
  }: ListUserServiceRequest): Promise<ListUserServiceResponse> {
    const users = await this.usersRepository.list(query, page);

    return {
      users: users,
    };
  }
}
