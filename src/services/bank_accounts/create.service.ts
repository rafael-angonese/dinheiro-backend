import { BankAccount } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowAccountService } from '../accounts/ShowAccountService';


const showAccountService = new ShowAccountService()

interface IRequest {
    name: string;
    balance: number;
    user_id: string;
    account_id: string;
};

export class CreateBankAccountService {
    async execute(params: IRequest): Promise<Error | BankAccount> {

        const account = await showAccountService.execute({ id: params.account_id, user_id: params.user_id })

        if (!account) {
            return new Error("Account not found");
        }

        const data = await prismaClient.bankAccount.create({
            data: {
                ...params,
            }
        })

        return data;
    }
}
