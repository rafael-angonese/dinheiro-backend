import { TransactionsRepository } from '@/repositories/transactions-repository';
import { Transaction } from '@prisma/client';

interface CreateTransactionServiceRequest {
  date: Date;
  description: string;
  amount: number;
  type: string;
  categoryId: string;
  userId: string;
  accountId: string;
  bankAccountId: string;
}

interface CreateTransactionServiceResponse {
  transaction: Transaction;
}

export class CreateTransactionService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    date,
    description,
    amount,
    type,
    categoryId,
    userId,
    accountId,
    bankAccountId,
  }: CreateTransactionServiceRequest): Promise<CreateTransactionServiceResponse> {
    const transaction = await this.transactionsRepository.create({
      date,
      description,
      amount,
      type,
      categoryId,
      userId,
      accountId,
      bankAccountId,
      sourceAccountId: null,
    });

    return {
      transaction,
    };
  }
}
