import { Category } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowCategoryService } from "./show.service";

const showCategoryService = new ShowCategoryService();

type IRequestProps = {
    name: string;
    type: string;
};

export class UpdateCategoryService {
    async execute(id: string, params: IRequestProps): Promise<Category> {

        const data = await showCategoryService.execute({ id })

        const updated = await prismaClient.category.update({
            where: {
                id,
            },
            data: {
                ...params,
            }
        })
        return updated;
    }
}
