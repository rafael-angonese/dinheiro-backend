import { Transaction } from "../../../prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowTransactionService } from "./show.service";

const showTransactionService = new ShowTransactionService();

export class DeleteTransactionService {
  async execute(id: string, user_id: string): Promise<Transaction> {
    const data = await showTransactionService.execute({ id, user_id });

    const deleted = await prismaClient.transaction.delete({
      where: {
        id,
      },
    });

    return deleted;
  }
}
