import { User } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";


export class ListUserService {
    async execute(): Promise<Error | User[]> {

        const users = await prismaClient.user.findMany()

        return users;
    }
}
