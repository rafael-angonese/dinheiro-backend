import { Request, Response } from "express";
import { DeleteBankAccountService } from "../../services/bank_accounts/delete.service";

const deleteService = new DeleteBankAccountService();

export class DeleteAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { user_id } = request.auth

        const result = await deleteService.execute(id, user_id)

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(200).send("")
    }
}