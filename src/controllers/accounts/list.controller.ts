import { Request, Response } from "express";
import { ListAccountService } from "../../services/accounts/list.service";

const listService = new ListAccountService();

export class ListAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.auth

        const result = await listService.execute({ user_id })

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result)
    }
}