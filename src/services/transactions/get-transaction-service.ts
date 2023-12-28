import { TransactionNotFoundError } from '@/errors/transactions/TransactionNotFoundError';
import { TransactionsRepository } from '@/repositories/transactions-repository';
import { Transaction } from '@prisma/client';

interface GetTransactionServiceRequest {
  id: string;
}

interface GetTransactionServiceResponse {
  transaction: Transaction;
}

export class GetTransactionService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    id,
  }: GetTransactionServiceRequest): Promise<GetTransactionServiceResponse> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) {
      throw new TransactionNotFoundError();
    }

    return {
      transaction,
    };
  }
}
