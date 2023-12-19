import { Request, Response } from 'express';
import { ListTransactionService } from '../../services/transactions/list.service';

const listService = new ListTransactionService();

interface ICtxQuery {
  account_id: string;
  month: string;
}

export async function list(
  request: Request<{}, {}, {}, ICtxQuery>,
  response: Response,
): Promise<Response> {
  const { user_id } = request.auth;
  const { account_id, month } = request.query;

  const date = new Date(month);

  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const result = await listService.execute({
    user_id,
    account_id,
    startDate: startOfMonth,
    endDate: endOfMonth,
  });

  return response.json(result);
}
