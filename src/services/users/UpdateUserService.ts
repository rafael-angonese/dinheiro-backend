import { User } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

type UserRequest = {
    name: string;
    email: string;
    role: string;
};

export class UpdateUserService {
    async execute(id: string, userParams: UserRequest): Promise<Error | User> {

        const updatedUser = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                ...userParams,
            }
        })
        return updatedUser;
    }
}
