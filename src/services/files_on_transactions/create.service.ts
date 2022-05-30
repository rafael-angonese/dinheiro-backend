import { FileOnTransaction } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRequest {
  file_id: string;
  transaction_id: string;
}

export class CreateFileOnTransactionService {
  async execute(params: IRequest): Promise<FileOnTransaction> {
    const data = await prismaClient.fileOnTransaction.create({
      data: {
        ...params,
      },
    });

    return data;
  }
}
