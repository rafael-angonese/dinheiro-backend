import { BankAccount } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRquestProps {
    user_id: string
}

export class ListBankAccountService {
    async execute({ user_id }: IRquestProps): Promise<Error | BankAccount[]> {

        const data = await prismaClient.bankAccount.findMany({
            where: {
                user_id
            }
        })

        return data;
    }
}
