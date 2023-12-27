import { BankAccount } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";


interface IRequest {
  name: string;
  balance: number;
  user_id: string;
  account_id: string;
}

export class CreateBankAccountService {
  async execute(params: IRequest): Promise<BankAccount> {
    // const account = await showAccountService.execute({
    //   id: params.account_id,
    //   user_id: params.user_id,
    // });

    const data = await prismaClient.bankAccount.create({
      data: {
        ...params,
      },
    });

    return data;
  }
}
