import { Request, Response } from "express";
import { ListAccountService } from "../../services/accounts/ListAccountService";

const listAccountService = new ListAccountService();

export class ListAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.auth

        const data = await listAccountService.execute({ user_id })

        return response.json(data)
    }
}