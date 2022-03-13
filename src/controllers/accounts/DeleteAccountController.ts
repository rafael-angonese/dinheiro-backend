import { Request, Response } from "express";
import { DeleteAccountService } from "../../services/accounts/DeleteAccountService";

const deleteAccountService = new DeleteAccountService();

export class DeleteAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { user_id } = request.auth

        await deleteAccountService.execute(id, user_id)

        return response.status(200).send("")
    }
}