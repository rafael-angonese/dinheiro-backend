import { Account } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRquestProps {
    user_id: string
}

export class ListAccountService {
    async execute({ user_id }: IRquestProps): Promise<Error | Account[]> {

        const data = await prismaClient.account.findMany({
            where: {
                user_id
            }
        })

        return data;
    }
}
