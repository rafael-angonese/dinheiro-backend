import { Request, Response } from "express";
import { ShowBankAccountService } from "../../services/bank_accounts/show.service";

const showService = new ShowBankAccountService();

export class ShowBankAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { user_id } = request.auth

        const result = await showService.execute({ id, user_id })

        return response.json(result)
    }
}