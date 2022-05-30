import { Account } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { AccountNotFoundError } from "../../errors/accounts/AccountNotFoundError";

interface IRequestProps {
  id: string;
  user_id: string;
}

export class ShowAccountService {
  async execute({ id, user_id }: IRequestProps): Promise<Account> {
    const data = await prismaClient.account.findFirst({
      where: {
        id,
        user_id,
      },
    });

    if (!data) {
      throw new AccountNotFoundError();
    }

    return data;
  }
}
