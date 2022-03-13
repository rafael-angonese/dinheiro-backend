import { Account } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowAccountService } from "./show.service";

const showAccountService = new ShowAccountService();

type IRequestProps = {
    name: string;
    description: string;
};

export class UpdateAccountService {
    async execute(id: string, user_id: string, params: IRequestProps): Promise<Error | Account> {

        const data = await showAccountService.execute({ id, user_id })

        if (!data) {
            return new Error("Account not found");
        }

        const updated = await prismaClient.account.update({
            where: {
                id,
            },
            data: {
                ...params,
            }
        })
        return updated;
    }
}
