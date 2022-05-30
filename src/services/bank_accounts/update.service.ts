import { BankAccount } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowBankAccountService } from "./show.service";

const showBankAccountService = new ShowBankAccountService();

type IRequestProps = {
    name: string;
    balance: number;
};

export class UpdateBankAccountService {
    async execute(id: string, user_id: string, params: IRequestProps): Promise<BankAccount> {

        const data = await showBankAccountService.execute({ id, user_id })

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
