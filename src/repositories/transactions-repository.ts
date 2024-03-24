import { Meta } from '@/@types/meta';
import { Prisma, Transaction } from '@prisma/client';

export interface GetTransactionsRequest {
  qs?: string;
  page: number;
  perPage: number;
  userId?: string
  accountId?: string;
  startDate?: Date;
  endDate?: Date;
 
}

export interface GetTransactionsResponse {
  data: Transaction[]
  meta: Meta
}

export interface TransactionsRepository {
  list(props: GetTransactionsRequest): Promise<GetTransactionsResponse>;
  findById(id: string): Promise<Transaction | null>;
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
  update(
    id: string,
    data: Prisma.TransactionUncheckedUpdateInput,
  ): Promise<Transaction>;
  destroy(id: string): Promise<Transaction | null>;
}
