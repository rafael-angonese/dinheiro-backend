import { Request, Response } from 'express';
import { ListUserService } from '../../services/users/list.service';

const listUserService = new ListUserService();

export async function list(
  request: Request,
  response: Response,
): Promise<Response> {
  const users = await listUserService.execute();

  return response.json(users);
}
