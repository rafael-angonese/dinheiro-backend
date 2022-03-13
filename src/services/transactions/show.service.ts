import { Transaction } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRequestProps {
    id: string;
    user_id: string;
}

export class ShowTransactionService {
    async execute({ id, user_id }: IRequestProps): Promise<Error | Transaction | null> {

        const data = await prismaClient.transaction.findFirst({
            where: {
                id,
                user_id
            }
        })

        return data
    }
}
