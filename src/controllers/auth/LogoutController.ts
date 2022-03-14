import { Request, Response } from "express";
import { JWTTokenMissingError } from "../../errors/auth/JWTTokenMissingError";
import { LogoutService } from "../../services/auth/LogoutService";

const logoutService = new LogoutService();

export class LogoutController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { allDevices } = request.body
        const refreshTokenCookie = request.cookies.refreshToken

        if (!refreshTokenCookie) {
            throw new JWTTokenMissingError()
        }

        const result = await logoutService.execute({ refreshToken: refreshTokenCookie, allDevices });

        response.cookie('refreshToken', '')

        return response.json({})
    }
}