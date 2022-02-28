import { Request, Response } from "express";
import { UpdateUserService } from "../../services/users/UpdateUserService";

const updateUserService = new UpdateUserService();
export class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { name, email, role } = request.body

        const user = await updateUserService.execute(id, { name, email, role });

        return response.json(user)
    }
}