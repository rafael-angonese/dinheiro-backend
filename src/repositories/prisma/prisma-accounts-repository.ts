import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { AccountsRepository, GetAccountsRequest } from '@/repositories/accounts-repository';
export class PrismaAccountRepository implements AccountsRepository {
  async list({
    qs,
    page,
    perPage,
    userId
  }: GetAccountsRequest) {
    const query: Prisma.AccountFindManyArgs = {
      where: {
        ...(qs && {
          name: {
            contains: qs,
            mode: 'insensitive',
          },
        }),
        userId: userId
      },
    };

    const [accounts, count] = await prisma.$transaction([
      prisma.account.findMany({...query, take: perPage,
        skip: (page - 1) * perPage }),
      prisma.account.count({ where: query.where })
    ]);

    return {
      data: accounts,
      meta: {
        total: count,
        lastPage: Math.ceil(count / perPage)
      }
    };
  }

  async findById(id: string) {
    const account = await prisma.account.findUnique({
      where: {
        id,
      },
    });

    return account;
  }
  async create(data: Prisma.AccountUncheckedCreateInput) {
    const account = await prisma.account.create({
      data,
    });

    return account;
  }

  async update(id: string, data: Prisma.AccountUpdateInput) {
    const account = await prisma.account.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return account;
  }

  async destroy(id: string) {
    const account = await prisma.account.delete({
      where: {
        id: id,
      },
    });

    return account;
  }
}
