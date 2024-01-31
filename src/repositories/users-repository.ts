import { Meta } from '@/@types/meta';
import { Prisma, User } from '@prisma/client';

export interface GetUsersRequest {
  qs?: string;
  page: number;
  perPage: number;
}

export interface GetUsersResponse {
  data: User[]
  meta: Meta
}

export interface UsersRepository {
  list(params: GetUsersRequest): Promise<GetUsersResponse>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  destroy(id: string): Promise<User | null>;
}
