import { Request, Response } from 'express';
import { DeleteCategoryService } from '../../services/categories/delete.service';

const deleteService = new DeleteCategoryService();

export async function destroy(
  request: Request,
  response: Response,
): Promise<Response> {
  const { id } = request.params;

  await deleteService.execute(id);

  return response.status(200).send('');
}
