import { Request, Response } from "express";
import { UpdateTransactionService } from "../../services/transactions/update.service";

const updateService = new UpdateTransactionService();
export class UpdateTransactionController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { user_id } = request.auth
        const { date, description, amount, type, category_id, bank_account_id } = request.body

        const result = await updateService.execute(id, user_id, { date, description, amount, type, category_id, bank_account_id });

        return response.json(result)
    }
}