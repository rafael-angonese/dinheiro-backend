import { BankAccount } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { BankAccountNotFoundError } from "../../errors/bank_accounts/BankAccountNotFoundError";

interface IRequestProps {
    id: string;
    user_id: string;
}

export class ShowBankAccountService {
    async execute({ id, user_id }: IRequestProps): Promise<BankAccount> {

        const data = await prismaClient.bankAccount.findFirst({
            where: {
                id,
                user_id
            }
        })

        if (!data) {
            throw new BankAccountNotFoundError()
        }

        return data
    }
}
