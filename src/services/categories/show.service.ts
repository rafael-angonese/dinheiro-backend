import { Category } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { CategoryNotFoundError } from "../../errors/categories/CategoryNotFoundError";

interface IRequestProps {
  id: string;
}

export class ShowCategoryService {
  async execute({ id }: IRequestProps): Promise<Category> {
    const data = await prismaClient.category.findFirst({
      where: {
        id,
      },
    });

    if (!data) {
      throw new CategoryNotFoundError();
    }

    return data;
  }
}
