import { Request, Response } from 'express';
import { AuthenticateService } from '../../services/auth/AuthenticateService';

const authenticateService = new AuthenticateService();

export async function authenticate(
  request: Request,
  response: Response,
): Promise<Response> {
  const { email, password } = request.body;

  const result = await authenticateService.execute({ email, password });

  const { token, refreshToken } = result;

  return response.json({ token, refreshToken });
}
