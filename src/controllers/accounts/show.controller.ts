import { Request, Response } from "express";
import { ShowAccountService } from "../../services/accounts/show.service";

const showService = new ShowAccountService();

export class ShowAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { user_id } = request.auth

        const result = await showService.execute({ id, user_id })

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result)
    }
}