import { Category } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRequest {
    name: string;
    type: string;
};

export class CreateCategoryService {
    async execute(params: IRequest): Promise<Error | Category> {

        const data = await prismaClient.category.create({
            data: {
                ...params,
            }
        })

        return data;
    }
}
