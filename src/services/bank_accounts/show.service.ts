import { BankAccount } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRequestProps {
    id: string;
    user_id: string;
}

export class ShowBankAccountService {
    async execute({ id, user_id }: IRequestProps): Promise<Error | BankAccount | null> {

        const data = await prismaClient.bankAccount.findFirst({
            where: {
                id,
                user_id
            }
        })

        return data
    }
}
