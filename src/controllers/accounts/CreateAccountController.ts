import { Request, Response } from "express";
import { CreateAccountService } from "../../services/accounts/CreateAccountService";

const createAccountService = new CreateAccountService();
export class CreateAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.auth
        const { name, description } = request.body

        const account = await createAccountService.execute({ name, description, user_id });

        return response.json(account)
    }
}