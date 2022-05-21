import { prismaClient } from "../../database/prismaClient";
import { FileOnTransaction } from "../../../prisma/client";

interface IRequest {
    file_id: string;
    transaction_id: string;
};

export class CreateFileOnTransactionService {
    async execute(params: IRequest): Promise<FileOnTransaction> {

        const data = await prismaClient.fileOnTransaction.create({
            data: {
                ...params,
            }
        })

        return data;
    }
}
