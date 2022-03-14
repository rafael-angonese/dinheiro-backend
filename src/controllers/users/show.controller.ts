import { Request, Response } from "express";
import { ShowUserService } from "../../services/users/show.service";

const showService = new ShowUserService();

export class ShowUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params

        const user = await showService.execute(id)

        return response.json(user)
    }
}