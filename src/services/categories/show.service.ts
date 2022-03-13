import { Category } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRequestProps {
    id: string;
}

export class ShowCategoryService {
    async execute({ id }: IRequestProps): Promise<Error | Category | null> {

        const data = await prismaClient.category.findFirst({
            where: {
                id
            }
        })

        return data
    }
}
