import { Category } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowCategoryService } from "./show.service";

const showCategoryService = new ShowCategoryService();

export class DeleteCategoryService {
  async execute(id: string): Promise<Category> {
    const data = await showCategoryService.execute({ id });

    const deleted = await prismaClient.category.delete({
      where: {
        id,
      },
    });

    return deleted;
  }
}
