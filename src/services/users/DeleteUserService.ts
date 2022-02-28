import { User } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

export class DeleteUserService {
    async execute(id: string): Promise<Error | User> {

        const deletedUser = await prismaClient.user.delete({
            where: {
                id: id
            }
        })
        return deletedUser;
    }
}
