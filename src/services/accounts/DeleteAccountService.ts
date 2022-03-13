import { Account } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ShowAccountService } from "./ShowAccountService";

const showAccountService = new ShowAccountService();

export class DeleteAccountService {
    async execute(id: string, user_id: string): Promise<Error | Account> {

        const data = await showAccountService.execute({ id, user_id })

        if (!data) {
            return new Error("Account not found");
        }

        const deleted = await prismaClient.account.delete({
            where: {
                id
            }
        })
        
        return deleted;
    }
}
