import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { BankAccountsRepository, GetBankAccountsRequest } from '@/repositories/bank-accounts-repository';

export class PrismaBankAccountsRepository implements BankAccountsRepository {
  async list({
    userId,
    qs,
    page,
    perPage,
  }: GetBankAccountsRequest) {
    const query: Prisma.BankAccountFindManyArgs = {
      where: {
        userId,
        ...(qs && {
          name: {
            contains: qs,
            mode: 'insensitive',
          },
        }),
      },
    };

    const [bankAccounts, count] = await prisma.$transaction([
      prisma.bankAccount.findMany({...query, take: perPage,
        skip: (page - 1) * perPage }),
      prisma.bankAccount.count({ where: query.where })
    ]);


    return {
      data: bankAccounts,
      meta: {
        total: count,
        lastPage: Math.ceil(count / perPage)
      }
    };
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
