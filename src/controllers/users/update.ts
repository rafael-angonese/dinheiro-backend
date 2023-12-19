import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/users/update.service';

const updateUserService = new UpdateUserService();

export async function update(
  request: Request,
  response: Response,
): Promise<Response> {
  const { id } = request.params;
  const { name, email, role } = request.body;

  const user = await updateUserService.execute(id, { name, email, role });

  return response.json(user);
}
