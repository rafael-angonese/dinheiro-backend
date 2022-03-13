import { Account, User } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRequestProps {
    id: string;
    user_id: string;
}

export class ShowAccountService {
    async execute({ id, user_id }: IRequestProps): Promise<Error | Account | null> {

        const data = await prismaClient.account.findFirst({
            where: {
                id,
                user_id
            }
        })

        return data
    }
}
