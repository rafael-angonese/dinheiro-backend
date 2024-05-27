import { Meta } from '@/@types/meta';
import { BankAccount, Prisma } from '@prisma/client';

export interface GetBankAccountsRequest {
  userId: string;
  qs?: string;
  page: number;
  perPage: number;
}

export interface GetBankAccountsResponse {
  data: BankAccount[]
  meta: Meta
}

export interface BankAccountsRepository {
  list(params: GetBankAccountsRequest): Promise<GetBankAccountsResponse>;
  findById(id: string): Promise<BankAccount | null>;
  create(data: Prisma.BankAccountUncheckedCreateInput): Promise<BankAccount>;
  update(id: string, data: Prisma.BankAccountUpdateInput): Promise<BankAccount>;
  destroy(id: string): Promise<BankAccount | null>;
}
