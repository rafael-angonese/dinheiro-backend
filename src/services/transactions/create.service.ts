import { Transaction } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRequest {
  date: Date;
  description: string;
  amount: number;
  type: string;
  category_id: string;
  user_id: string;
  account_id: string;
  bank_account_id: string;
}

export class CreateTransactionService {
  async execute(params: IRequest): Promise<Transaction> {
    // const account = await showAccountService.execute({
    //   id: params.account_id,
    //   user_id: params.user_id,
    // });

    // const category = await showCategoryService.execute({
    //   id: params.category_id,
    // });

    // const bank_account = await showBankAccountService.execute({
    //   id: params.bank_account_id,
    //   user_id: params.user_id,
    // });

    const data = await prismaClient.transaction.create({
      data: {
        ...params,
      },
    });

    return data;
  }
}
