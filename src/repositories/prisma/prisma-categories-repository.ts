import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { CategoriesRepository } from '@/repositories/categories-repository';
export class PrismaCategoriesRepository implements CategoriesRepository {
  async list(query: string, page: number) {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return categories;
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }

  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({
      data,
    });

    return category;
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return category;
  }

  async destroy(id: string) {
    const category = await prisma.category.delete({
      where: {
        id: id,
      },
    });

    return category;
  }
}
