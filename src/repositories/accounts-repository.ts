import { Meta } from '@/@types/meta';
import { Account, Prisma } from '@prisma/client';

export interface GetAccountsRequest {
  qs?: string;
  page: number;
  perPage: number;
  userId: string
}

export interface GetAccountsResponse {
  data: Account[]
  meta: Meta
}


export interface AccountsRepository {
  list(params: GetAccountsRequest): Promise<GetAccountsResponse>;
  findById(id: string): Promise<Account | null>;
  create(data: Prisma.AccountUncheckedCreateInput): Promise<Account>;
  update(id: string, data: Prisma.AccountUpdateInput): Promise<Account>;
  destroy(id: string): Promise<Account | null>;
}
