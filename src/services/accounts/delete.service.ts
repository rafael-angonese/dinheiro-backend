import { Account } from "../../../prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowAccountService } from "./show.service";

const showAccountService = new ShowAccountService();

export class DeleteAccountService {
  async execute(id: string, user_id: string): Promise<Account> {
    await showAccountService.execute({ id, user_id });

    const deleted = await prismaClient.account.delete({
      where: {
        id,
      },
    });

    return deleted;
  }
}
