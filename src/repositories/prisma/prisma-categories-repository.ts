import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { CategoriesRepository, GetCategoriesRequest } from '@/repositories/categories-repository';
export class PrismaCategoriesRepository implements CategoriesRepository {
  async list({
    qs,
    page,
    perPage
  }: GetCategoriesRequest) {
    const query: Prisma.CategoryFindManyArgs = {
      where: {
        ...(qs && {
          name: {
            contains: qs,
            mode: 'insensitive',
          },
        })
      },
    };

    const [categories, count] = await prisma.$transaction([
      prisma.category.findMany({...query, take: perPage,
        skip: (page - 1) * perPage }),
      prisma.category.count({ where: query.where })
    ]);

    return {
      data: categories,
      meta: {
        total: count,
        lastPage: Math.ceil(count / perPage)
      }
    };
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
