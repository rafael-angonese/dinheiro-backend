import { BankAccount } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowBankAccountService } from "./show.service";

const showBankAccountService = new ShowBankAccountService();

export class DeleteBankAccountService {
    async execute(id: string, user_id: string): Promise<Error | BankAccount> {

        const data = await showBankAccountService.execute({ id, user_id })

        if (!data) {
            return new Error("Bank Account not found");
        }

        const deleted = await prismaClient.bankAccount.delete({
            where: {
                id
            }
        })

        return deleted;
    }
}
