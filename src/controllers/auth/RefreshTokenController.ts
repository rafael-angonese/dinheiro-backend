import { Request, Response } from "express";
import authConfig from "../../config/auth.config";
import { JWTTokenMissingError } from "../../errors/auth/JWTTokenMissingError";
import { RefreshTokenService } from "../../services/auth/RefreshTokenService";

const refreshTokenService = new RefreshTokenService();

export class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {

        const refreshTokenCookie = request.cookies.refreshToken

        if (!refreshTokenCookie) {
            throw new JWTTokenMissingError()
        }

        const result = await refreshTokenService.execute({ refreshToken: refreshTokenCookie });

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