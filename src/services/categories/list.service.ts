import { Category } from "../../../prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRquestProps {
  type: string;
}

export class ListCategoryService {
  async execute({ type }: IRquestProps): Promise<Category[]> {
    const data = await prismaClient.category.findMany({
      where: {
        type,
      },
    });

    return data;
  }
}
