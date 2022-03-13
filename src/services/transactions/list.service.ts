import { Transaction } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRquestProps {
    user_id: string
}

export class ListTransactionService {
    async execute({ user_id }: IRquestProps): Promise<Error | Transaction[]> {

        const data = await prismaClient.transaction.findMany({
            where: {
                user_id
            }
        })

        return data;
    }
}
