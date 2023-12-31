import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { AccountsRepository } from '../accounts-repository';
export class PrismaAccountRepository implements AccountsRepository {
  async list(query: string, page: number) {
    const accounts = await prisma.account.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return accounts;
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
