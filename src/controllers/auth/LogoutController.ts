import { Request, Response } from "express";
import { LogoutService } from "../../services/auth/LogoutService";

const logoutService = new LogoutService();

export class LogoutController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { allDevices } = request.body
        const refreshTokenCookie = request.cookies.refreshToken

        if (!refreshTokenCookie) {
            return response.status(401).json({ error: "refreshToken is missing" });
        }

        const result = await logoutService.execute({ refreshToken: refreshTokenCookie, allDevices });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        response.cookie('refreshToken', '')

        return response.json({})
    }
}