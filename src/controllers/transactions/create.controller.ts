import { Request, Response } from "express";
import { CreateTransactionService } from "../../services/transactions/create.service";
import { CreateFileService } from "../../services/files/create.service";
import { CreateFileOnTransactionService } from "../../services/files_on_transactions/create.service";

const createService = new CreateTransactionService();
const createFileService = new CreateFileService();
const createFileOnTransactionService = new CreateFileOnTransactionService();

export class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.auth;
    const {
      date,
      description,
      amount,
      type,
      category_id,
      account_id,
      bank_account_id,
    } = request.body;
    const files = request.files as Express.MulterS3.File[];

    const transaction = await createService.execute({
      date,
      description,
      amount: Number(amount),
      type,
      category_id,
      account_id,
      bank_account_id,
      user_id,
    });

    if (files) {
      for (const element of files) {
        const file = await createFileService.execute({
          key: element.key,
          model: "Transaction",
          name: element.originalname,
          bucket: element.bucket,
          url: element.location,
          size: element.size,
          content_type: element.contentType,
          original_name: element.originalname,
        });

        await createFileOnTransactionService.execute({
          file_id: file.id,
          transaction_id: transaction.id,
        });
      }
    }

    return response.json(transaction);
  }
}
