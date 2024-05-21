import { prismaClient } from '@/database/prismaClient';
import { TransactionsRepository } from '@/repositories/transactions-repository';
import { Transaction } from '@prisma/client';

interface CreateTransactionServiceRequest {
  date: Date;
  description: string;
  amount: number;
  type: string;
  categoryId: string;
  userId: string;
  bankAccountId: string;
  files?: {
    contentType: string;
    name: string;
    originalName: string;
    size: number;
  }[];
}

interface CreateTransactionServiceResponse {
  transaction: Transaction;
}

export class CreateTransactionService {
  constructor(private transactionsRepository: TransactionsRepository) { }

  async execute({
    date,
    description,
    amount,
    type,
    categoryId,
    userId,
    bankAccountId,
    files,
  }: CreateTransactionServiceRequest): Promise<CreateTransactionServiceResponse> {
    const transaction = await this.transactionsRepository.create({
      date,
      description,
      amount,
      type,
      categoryId,
      userId,
      bankAccountId,
    });

    if (files) {
      for (const file of files) {
       const createdFile = await prismaClient.file.create({
          data: {
            ...file
          }
        });

        await prismaClient.transactionFiles.create({
          data: {
            fileId: createdFile.id,
            transactionId: transaction.id,
          }
        });
      }
    }

    return {
      transaction,
    };
  }
}
