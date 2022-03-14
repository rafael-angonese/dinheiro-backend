import { Request, Response } from "express";
import { CreateTransactionService } from "../../services/transactions/create.service";

const createService = new CreateTransactionService();

export class CreateTransactionController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.auth
        const { date, description, amount, type, category_id, account_id, bank_account_id } = request.body

        const result = await createService.execute({ date, description, amount, type, category_id, account_id, bank_account_id, user_id });

        return response.json(result)
    }
}