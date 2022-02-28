import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService";

const createUserService = new CreateUserService();
export class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { name, email, password, role } = request.body

        const user = await createUserService.execute({ name, email, password, role });

        return response.json(user)
    }
}