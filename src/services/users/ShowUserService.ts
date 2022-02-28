import { User } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";


export class ShowUserService {
    async execute(id: string): Promise<Error | User | null> {

        const user = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        })

        return user
    }
}
