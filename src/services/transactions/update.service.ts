import { Transaction } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowBankAccountService } from '../bank_accounts/show.service';
import { ShowCategoryService } from '../categories/show.service';
import { ShowTransactionService } from "./show.service";

const showCategoryService = new ShowCategoryService()
const showBankAccountService = new ShowBankAccountService()
const showTransactionService = new ShowTransactionService();

type IRequestProps = {
    date: Date;
    description: string;
    amount: number;
    type: string;
    category_id: string;
    bank_account_id: string;
};

export class UpdateTransactionService {
    async execute(id: string, user_id: string, params: IRequestProps): Promise<Error | Transaction> {

        const data = await showTransactionService.execute({ id, user_id })

        if (!data) {
            return new Error("Transaction not found");
        }

        const category = await showCategoryService.execute({ id: params.category_id })

        if (!category) {
            return new Error("Category not found");
        }

        const bank_account = await showBankAccountService.execute({ id: params.bank_account_id, user_id: user_id })

        if (!bank_account) {
            return new Error("Bank Account not found");
        }

        const updated = await prismaClient.transaction.update({
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
