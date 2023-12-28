import { TransactionNotFoundError } from '@/errors/transactions/TransactionNotFoundError';
import { TransactionsRepository } from '@/repositories/transactions-repository';
import { Transaction } from '@prisma/client';

interface DestroyTransactionServiceRequest {
  id: string;
}

interface DestroyTransactionServiceResponse {
  transaction: Transaction | null;
}

export class DestroyTransactionService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    id,
  }: DestroyTransactionServiceRequest): Promise<DestroyTransactionServiceResponse> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) {
      throw new TransactionNotFoundError();
    }

    await this.transactionsRepository.destroy(id);

    return {
      transaction,
    };
  }
}
