import { Request, Response } from "express";
import { CreateAccountService } from "../../services/accounts/create.service";

const createService = new CreateAccountService();
export class CreateAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.auth
        const { name, description } = request.body

        const result = await createService.execute({ name, description, user_id });

        return response.json(result)
    }
}