import { Request, Response } from "express";
import { ListTransactionService } from "../../services/transactions/list.service";

const listService = new ListTransactionService();

export class ListTransactionController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.auth

        const result = await listService.execute({ user_id })

        return response.json(result)
    }
}