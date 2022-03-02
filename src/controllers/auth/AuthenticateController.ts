import { Request, Response } from "express";
import authConfig from "../../config/auth.config";
import { AuthenticateService } from "../../services/auth/AuthenticateService";

const authenticateService = new AuthenticateService();
export class AuthenticateController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { email, password } = request.body

        const result = await authenticateService.execute({ email, password });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        const { token, refreshToken } = result

        const cookieOptions = {
            maxAge: authConfig.refreshToken.duration,
            httpOnly: true,
        }

        response.cookie('refreshToken', refreshToken, cookieOptions)

        return response.json({ token })
    }
}