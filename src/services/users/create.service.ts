import { User } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { generateHash } from "../../providers/crypto";

type UserRequest = {
    name: string;
    email: string;
    password: string;
    role: string;
};

export class CreateUserService {
    async execute(userParams: UserRequest): Promise<User> {

        const passwordHash = await generateHash(userParams.password);

        const user = await prismaClient.user.create({
            data: {
                ...userParams,
                password: passwordHash
            }
        })

        return user;
    }
}
