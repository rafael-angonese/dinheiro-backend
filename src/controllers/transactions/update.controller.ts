import { Request, Response } from "express";
import { CreateFileService } from "../../services/files/create.service";
import { CreateFileOnTransactionService } from "../../services/files_on_transactions/create.service";
import { UpdateTransactionService } from "../../services/transactions/update.service";

const updateService = new UpdateTransactionService();
const createFileService = new CreateFileService();
const createFileOnTransactionService = new CreateFileOnTransactionService();

export class UpdateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { user_id } = request.auth;
    const { date, description, amount, category_id, bank_account_id } =
      request.body;

    const files = request.files as Express.MulterS3.File[];

    const transaction = await updateService.execute(id, user_id, {
      date,
      description,
      amount: Number(amount),
      category_id,
      bank_account_id,
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
