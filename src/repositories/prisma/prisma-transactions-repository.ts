import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import {
  GetTransactionsRequest,
  TransactionsRepository,
} from '@/repositories/transactions-repository';
export class PrismaTransactionsRepository implements TransactionsRepository {
  async list({
    qs,
    page,
    perPage,
    userId,
    bankAccountId,
    // startDate,
    // endDate,
  }: GetTransactionsRequest) {
    const query: Prisma.TransactionFindManyArgs = {
      where: {
        ...(qs && {
          description: {
            contains: qs,
            mode: 'insensitive',
          },
        }),
        ...(userId && {
          userId: userId,
        }),
        ...(bankAccountId && {
          bankAccountId: bankAccountId,
        })
      },
    };

    const [transactions, count] = await prisma.$transaction([
      prisma.transaction.findMany({...query, take: perPage, include: {
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
        transactionFiles: {
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
          }
        },
      },
      skip: (page - 1) * perPage }),
      prisma.transaction.count({ where: query.where })
    ]);

    return {
      data: transactions,
      meta: {
        total: count,
        lastPage: Math.ceil(count / perPage)
      }
    };
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
