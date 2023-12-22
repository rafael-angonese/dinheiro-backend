import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
  async list(query: string, page: number) {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return users;
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
