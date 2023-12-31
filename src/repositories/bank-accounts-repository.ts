import { BankAccount, Prisma } from '@prisma/client';

export interface BankAccountsRepository {
  list(
    query: string,
    page: number,
    userId: string,
    accountId: string,
  ): Promise<BankAccount[]>;
  findById(id: string): Promise<BankAccount | null>;
  create(data: Prisma.BankAccountUncheckedCreateInput): Promise<BankAccount>;
  update(id: string, data: Prisma.BankAccountUpdateInput): Promise<BankAccount>;
  destroy(id: string): Promise<BankAccount | null>;
}
