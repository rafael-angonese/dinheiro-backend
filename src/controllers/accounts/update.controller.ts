import { Request, Response } from "express";
import { UpdateAccountService } from "../../services/accounts/update.service";

const updateService = new UpdateAccountService();
export class UpdateAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { user_id } = request.auth
        const { name, description } = request.body

        const result = await updateService.execute(id, user_id, { name, description });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result)
    }
}