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
    fileOnTransaction: {
      select: {
        id: true;
        file_id: true;
        file: {
          select: {
            id: true;
            content_type: true;
            name: true;
            original_name: true;
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
