import { Request, Response } from 'express';
import { UpdateCategoryService } from '../../services/categories/update.service';

const updateService = new UpdateCategoryService();

export async function update(
  request: Request,
  response: Response,
): Promise<Response> {
  const { id } = request.params;
  const { name, type } = request.body;

  const result = await updateService.execute(id, { name, type });

  return response.json(result);
}
