import { Request, Response } from "express";
import { JWTTokenMissingError } from "../../errors/auth/JWTTokenMissingError";
import { LogoutService } from "../../services/auth/LogoutService";

const logoutService = new LogoutService();

export class LogoutController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { allDevices, refreshToken } = request.body;

    if (!refreshToken) {
      throw new JWTTokenMissingError();
    }

    const result = await logoutService.execute({ refreshToken, allDevices });

    return response.json({});
  }
}
