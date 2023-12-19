import { Request, Response } from 'express';
import { ShowTransactionService } from '../../services/transactions/show.service';

const showService = new ShowTransactionService();

export async function show(
  request: Request,
  response: Response,
): Promise<Response> {
  const { id } = request.params;
  const { user_id } = request.auth;

  const result = await showService.execute({ id, user_id });

  return response.json(result);
}
