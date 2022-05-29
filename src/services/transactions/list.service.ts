import { Transaction } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRquestProps {
  user_id: string;
  account_id: string;
  startDate: Date;
  endDate: Date;
}

export class ListTransactionService {
  async execute(params: IRquestProps): Promise<Transaction[]> {
    const data = await prismaClient.transaction.findMany({
      where: {
        user_id: params.user_id,
        account_id: params.account_id,
        date: {
          gte: params.startDate,
          lte: params.endDate,
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        bankAccount: {
          select: {
            id: true,
            name: true,
          },
        },
        fileOnTransaction: {
          select: {
            id: true,
            file_id: true,
            file: {
              select: {
                id: true,
                content_type: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return data;
  }
}
