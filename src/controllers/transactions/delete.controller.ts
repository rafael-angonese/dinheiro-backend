import { Request, Response } from "express";
import { DeleteTransactionService } from "../../services/transactions/delete.service";

const deleteService = new DeleteTransactionService();

export class DeleteTransactionController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { user_id } = request.auth

        const result = await deleteService.execute(id, user_id)

        return response.status(200).send("")
    }
}