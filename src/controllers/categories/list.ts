import { Request, Response } from 'express';
import { ListCategoryService } from '../../services/categories/list.service';

const listService = new ListCategoryService();

interface IListParams extends Request {
  query: {
    type: string;
  };
}

export async function list(
  request: IListParams,
  response: Response,
): Promise<Response> {
  const { type } = request.query;

  const result = await listService.execute({ type });

  return response.json(result);
}
