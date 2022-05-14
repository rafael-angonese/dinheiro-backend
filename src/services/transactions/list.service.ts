import { Transaction } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRquestProps {
    user_id: string
}

export class ListTransactionService {
    async execute({ user_id }: IRquestProps): Promise<Transaction[]> {

        const data = await prismaClient.transaction.findMany({
            where: {
                user_id
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                bankAccount: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        return data;
    }
}
