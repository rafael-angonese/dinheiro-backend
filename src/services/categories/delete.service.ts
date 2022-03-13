import { Category } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowCategoryService } from "./show.service";

const showCategoryService = new ShowCategoryService();

export class DeleteCategoryService {
    async execute(id: string): Promise<Error | Category> {

        const data = await showCategoryService.execute({ id })

        if (!data) {
            return new Error("Category not found");
        }

        const deleted = await prismaClient.category.delete({
            where: {
                id
            }
        })

        return deleted;
    }
}
