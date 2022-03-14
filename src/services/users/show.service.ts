import { User } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { UserNotFound } from "../../errors/users/UserNotFoundError";


export class ShowUserService {
    async execute(id: string): Promise<User> {

        const user = await prismaClient.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            throw new UserNotFound();
        }

        return user
    }
}
