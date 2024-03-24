import { TransactionNotFoundError } from '@/errors/transactions/TransactionNotFoundError';
import { TransactionsRepository } from '@/repositories/transactions-repository';
import { Transaction } from '@prisma/client';

interface UpdateTransactionServiceRequest {
  date?: Date;
  description?: string;
  amount?: number;
  type?: string;
  categoryId?: string;
  userId?: string;
  bankAccountId?: string;
}

interface UpdateTransactionServiceResponse {
  transaction: Transaction;
}

export class UpdateTransactionService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(
    id: string,
    {
      date,
      description,
      amount,
      type,
      categoryId,
      userId,
      bankAccountId,
    }: UpdateTransactionServiceRequest,
  ): Promise<UpdateTransactionServiceResponse> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) {
      throw new TransactionNotFoundError();
    }

    const updatedTransaction = await this.transactionsRepository.update(id, {
      date,
      description,
      amount,
      type,
      categoryId,
      userId,
      bankAccountId,
    });

    return {
      transaction: updatedTransaction,
    };
  }
}
