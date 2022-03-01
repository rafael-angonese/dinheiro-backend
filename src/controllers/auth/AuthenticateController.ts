import { Request, Response } from "express";
import { AuthenticateService } from "../../services/auth/AuthenticateService";

const authenticateService = new AuthenticateService();
export class AuthenticateController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { email, password } = request.body

        const user = await authenticateService.execute({ email, password });

        return response.json(user)
    }
}