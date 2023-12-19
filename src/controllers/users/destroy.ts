import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/users/delete.service';

const deleteUserService = new DeleteUserService();

export async function destroy(
  request: Request,
  response: Response,
): Promise<Response> {
  const { id } = request.params;

  await deleteUserService.execute(id);

  return response.status(200).send('');
}
