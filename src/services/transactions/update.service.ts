import { Transaction } from "../../../prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowBankAccountService } from "../bank_accounts/show.service";
import { ShowCategoryService } from "../categories/show.service";
import { ShowTransactionService } from "./show.service";

const showCategoryService = new ShowCategoryService();
const showBankAccountService = new ShowBankAccountService();
const showTransactionService = new ShowTransactionService();

type IRequestProps = {
  date: Date;
  description: string;
  amount: number;
  category_id: string;
  bank_account_id: string;
};

export class UpdateTransactionService {
  async execute(
    id: string,
    user_id: string,
    params: IRequestProps
  ): Promise<Transaction> {
    const data = await showTransactionService.execute({ id, user_id });

    const category = await showCategoryService.execute({
      id: params.category_id,
    });

    const bank_account = await showBankAccountService.execute({
      id: params.bank_account_id,
      user_id: user_id,
    });

    const updated = await prismaClient.transaction.update({
      where: {
        id,
      },
      data: {
        ...params,
      },
    });
    return updated;
  }
}
