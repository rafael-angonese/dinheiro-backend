import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { BankAccountsRepository } from '@/repositories/bank-accounts-repository';

export class PrismaBankAccountsRepository implements BankAccountsRepository {
  async list(query: string, page: number, userId: string, accountId: string) {
    const bankAccounts = await prisma.bankAccount.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
        userId: userId,
        accountId: accountId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return bankAccounts;
  }

  async findById(id: string) {
    const bankAccount = await prisma.bankAccount.findUnique({
      where: {
        id,
      },
    });

    return bankAccount;
  }
  async create(data: Prisma.BankAccountUncheckedCreateInput) {
    const bankAccount = await prisma.bankAccount.create({
      data,
    });

    return bankAccount;
  }

  async update(id: string, data: Prisma.BankAccountUpdateInput) {
    const bankAccount = await prisma.bankAccount.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return bankAccount;
  }

  async destroy(id: string) {
    const bankAccount = await prisma.bankAccount.delete({
      where: {
        id: id,
      },
    });

    return bankAccount;
  }
}
