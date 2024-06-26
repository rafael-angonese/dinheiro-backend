import { Meta } from '@/@types/meta';
import { Prisma, Transaction } from '@prisma/client';

export interface GetTransactionsRequest {
  qs?: string;
  page: number;
  perPage: number;
  userId: string
  bankAccountId?: string;
  startDate?: Date;
  endDate?: Date;

}

export interface GetTransactionsResponse {
  data: (Transaction & {
    category: {
      id: string;
      name: string;
    };
    bankAccount: {
      id: string;
      name: string;
    };
    transactionFiles: {
      id: string;
      fileId: string;
      file: {
        id: string;
        name: string;
        contentType: string;
        originalName: string | null;
      };
    }[];
  })[]
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
