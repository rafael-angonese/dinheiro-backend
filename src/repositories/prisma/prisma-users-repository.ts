import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { GetUsersRequest, UsersRepository } from '@/repositories/users-repository';
export class PrismaUsersRepository implements UsersRepository {
  async list({
    qs,
    page,
    perPage
  }: GetUsersRequest) {
    const query: Prisma.UserFindManyArgs = {
      where: {
        ...(qs && {
          name: {
            contains: qs,
            mode: 'insensitive',
          },
        })
      },
    };

    const [users, count] = await prisma.$transaction([
      prisma.user.findMany({...query, take: perPage,
        skip: (page - 1) * perPage }),
      prisma.user.count({ where: query.where })
    ]);


    return {
      data: users,
      meta: {
        total: count,
        lastPage: Math.ceil(count / perPage)
      }
    };
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return user;
  }

  async destroy(id: string) {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return user;
  }
}
