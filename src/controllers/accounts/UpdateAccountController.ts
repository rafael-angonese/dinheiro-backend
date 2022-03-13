import { Request, Response } from "express";
import { UpdateAccountService } from "../../services/accounts/UpdateAccountService";

const updateAccountService = new UpdateAccountService();
export class UpdateAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { user_id } = request.auth
        const { name, description } = request.body

        const data = await updateAccountService.execute(id, user_id, { name, description });

        return response.json(data)
    }
}