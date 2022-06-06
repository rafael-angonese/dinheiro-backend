import { Request, Response } from "express";
import { JWTTokenMissingError } from "../../errors/auth/JWTTokenMissingError";
import { RefreshTokenService } from "../../services/auth/RefreshTokenService";

const refreshTokenService = new RefreshTokenService();

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { refreshToken: refreshTokenBody } = request.body;

    if (!refreshTokenBody) {
      throw new JWTTokenMissingError();
    }

    const result = await refreshTokenService.execute({
      refreshToken: refreshTokenBody,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    const { token, refreshToken } = result;

    return response.json({ token, refreshToken });
  }
}
