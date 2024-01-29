import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import {
  ListTransactionsProps,
  TransactionsRepository,
} from '@/repositories/transactions-repository';
export class PrismaTransactionsRepository implements TransactionsRepository {
  async list({
    page,
    query,
    userId,
    accountId,
    startDate,
    endDate,
  }: ListTransactionsProps) {
    const transactions = await prisma.transaction.findMany({
      where: {
        description: {
          contains: query,
          mode: 'insensitive',
        },
        ...(userId && {
          user_id: userId,
        }),
        ...(accountId && {
          account_id: accountId,
        }),
        ...(startDate &&
          endDate && {
            date: {
              gte: startDate,
              lte: endDate,
            },
          }),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        bankAccount: {
          select: {
            id: true,
            name: true,
          },
        },
        fileOnTransactions: {
          select: {
            id: true,
            fileId: true,
            file: {
              select: {
                id: true,
                contentType: true,
                name: true,
                originalName: true,
              },
            },
          },
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return transactions;
  }

  async findById(id: string) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    return transaction;
  }

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({
      data,
    });

    return transaction;
  }

  async update(id: string, data: Prisma.TransactionUncheckedUpdateInput) {
    const transaction = await prisma.transaction.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return transaction;
  }

  async destroy(id: string) {
    const transaction = await prisma.transaction.delete({
      where: {
        id: id,
      },
    });

    return transaction;
  }
}
