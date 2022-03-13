import { Request, Response } from "express";
import { ListTransactionService } from "../../services/transactions/list.service";

const listService = new ListTransactionService();

export class ListTransactionController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.auth

        const result = await listService.execute({ user_id })

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result)
    }
}