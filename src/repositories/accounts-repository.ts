import { Account, Prisma } from '@prisma/client';

export interface AccountsRepository {
  list(query: string, page: number, userId: string): Promise<Account[]>;
  findById(id: string): Promise<Account | null>;
  create(data: Prisma.AccountUncheckedCreateInput): Promise<Account>;
  update(id: string, data: Prisma.AccountUpdateInput): Promise<Account>;
  destroy(id: string): Promise<Account | null>;
}
