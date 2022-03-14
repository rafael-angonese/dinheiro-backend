import { Transaction } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { TransactionNotFoundError } from "../../errors/transactions/TransactionNotFoundError";

interface IRequestProps {
    id: string;
    user_id: string;
}

export class ShowTransactionService {
    async execute({ id, user_id }: IRequestProps): Promise<Transaction> {

        const data = await prismaClient.transaction.findFirst({
            where: {
                id,
                user_id
            }
        })

        if (!data) {
            throw new TransactionNotFoundError()
        }

        return data
    }
}
