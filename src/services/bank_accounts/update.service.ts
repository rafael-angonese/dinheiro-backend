import { BankAccount } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowBankAccountService } from "./show.service";
import { ShowAccountService } from '../accounts/ShowAccountService'

const showBankAccountService = new ShowBankAccountService();
const showAccountService = new ShowAccountService()

type IRequestProps = {
    name: string;
    balance: number;
};

export class UpdateBankAccountService {
    async execute(id: string, user_id: string, params: IRequestProps): Promise<Error | BankAccount> {

        const data = await showBankAccountService.execute({ id, user_id })

        if (!data) {
            return new Error("Bank Account not found");
        }

        const updated = await prismaClient.bankAccount.update({
            where: {
                id,
            },
            data: {
                ...params,
            }
        })
        return updated;
    }
}
