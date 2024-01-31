import { Meta } from '@/@types/meta';
import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface ListUserServiceRequest {
  qs?: string;
  page: number;
  perPage: number;
}

interface ListUserServiceResponse {
  data: User[];
  meta: Meta
}

export class ListUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    qs,
    page,
    perPage
  }: ListUserServiceRequest): Promise<ListUserServiceResponse> {
    const { data, meta } = await this.usersRepository.list({
      qs,
      page,
      perPage
    });

    return {
      data,
      meta
    };
  }
}
