import { TransactionFiles } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRequest {
  fileId: string;
  transactionId: string;
}

export class CreateFileOnTransactionService {
  async execute(params: IRequest): Promise<TransactionFiles> {
    const data = await prismaClient.transactionFiles.create({
      data: {
        ...params,
      },
    });

    return data;
  }
}
