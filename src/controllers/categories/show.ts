import { Request, Response } from 'express';
import { ShowCategoryService } from '../../services/categories/show.service';

const showService = new ShowCategoryService();

export async function show(
  request: Request,
  response: Response,
): Promise<Response> {
  const { id } = request.params;

  const result = await showService.execute({ id });

  return response.json(result);
}
