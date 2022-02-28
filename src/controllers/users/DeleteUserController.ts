import { Request, Response } from "express";
import { DeleteUserService } from "../../services/users/DeleteUserService";

const deleteUserService = new DeleteUserService();

export class DeleteUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params

        await deleteUserService.execute(id)

        return response.status(200).send("")
    }
}