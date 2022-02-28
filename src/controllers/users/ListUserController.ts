import { Request, Response } from "express";
import { ListUserService } from "../../services/users/ListUserService";

const listUserService = new ListUserService();

export class ListUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        const users = await listUserService.execute()

        return response.json(users)
    }
}