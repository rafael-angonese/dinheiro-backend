import {
  ListTransactions,
  TransactionsRepository,
} from '@/repositories/transactions-repository';

interface ListTransactionsServiceRequest {
  query?: string;
  page: number;
  userId?: string;
  accountId?: string;
  startDate?: Date;
  endDate?: Date;
}

interface ListTransactionsServiceResponse {
  transactions: ListTransactions[];
}

export class ListTransactionsService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    page,
    query = '',
    userId,
    accountId,
    startDate,
    endDate,
  }: ListTransactionsServiceRequest): Promise<ListTransactionsServiceResponse> {
    const transactions = await this.transactionsRepository.list({
      query,
      page,
      userId,
      accountId,
      startDate,
      endDate,
    });

    return {
      transactions,
    };
  }
}
