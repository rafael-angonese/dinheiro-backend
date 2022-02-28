import { Request, Response } from "express";
import { ShowUserService } from "../../services/users/ShowUserService";

const listUserService = new ShowUserService();

export class ShowUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params

        const user = await listUserService.execute(id)

        return response.json(user)
    }
}