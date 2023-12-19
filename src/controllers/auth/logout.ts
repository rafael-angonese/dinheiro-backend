import { Request, Response } from 'express';
import { JWTTokenMissingError } from '../../errors/auth/JWTTokenMissingError';
import { LogoutService } from '../../services/auth/LogoutService';

const logoutService = new LogoutService();

export async function logout(
  request: Request,
  response: Response,
): Promise<Response> {
  const { allDevices, refreshToken } = request.body;

  if (!refreshToken) {
    throw new JWTTokenMissingError();
  }

  await logoutService.execute({ refreshToken, allDevices });

  return response.json({});
}
