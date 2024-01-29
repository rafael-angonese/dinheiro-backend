import { Prisma, Transaction } from '@prisma/client';

export interface ListTransactionsProps {
  page: number;
  query?: string;
  userId?: string;
  accountId?: string;
  startDate?: Date;
  endDate?: Date;
}

export type ListTransactions = Prisma.TransactionGetPayload<{
  include: {
    category: {
      select: {
        id: true;
        name: true;
      };
    };
    bankAccount: {
      select: {
        id: true;
        name: true;
      };
    };
    fileOnTransactions: {
      select: {
        id: true;
        fileId: true;
        file: {
          select: {
            id: true;
            contentType: true;
            name: true;
            originalName: true;
          };
        };
      };
    };
  };
}>;

export interface TransactionsRepository {
  list(props: ListTransactionsProps): Promise<ListTransactions[]>;
  findById(id: string): Promise<Transaction | null>;
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
  update(
    id: string,
    data: Prisma.TransactionUncheckedUpdateInput,
  ): Promise<Transaction>;
  destroy(id: string): Promise<Transaction | null>;
}
