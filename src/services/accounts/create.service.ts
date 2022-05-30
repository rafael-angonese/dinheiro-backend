import { Account } from "../../../prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRequest {
  name: string;
  description: string;
  user_id: string;
}

export class CreateAccountService {
  async execute(params: IRequest): Promise<Account> {
    const data = await prismaClient.account.create({
      data: {
        ...params,
      },
    });

    return data;
  }
}
