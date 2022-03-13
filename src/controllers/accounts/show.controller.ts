import { Request, Response } from "express";
import { ShowAccountService } from "../../services/accounts/show.service";

const showService = new ShowAccountService();

export class ShowAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { user_id } = request.auth

        const user = await showService.execute({ id, user_id })

        return response.json(user)
    }
}