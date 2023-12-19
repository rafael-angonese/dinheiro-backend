import { Request, Response } from 'express';
import { CreateBankAccountService } from '../../services/bank_accounts/create.service';

const createService = new CreateBankAccountService();

export async function create(
  request: Request,
  response: Response,
): Promise<Response> {
  const { user_id } = request.auth;
  const { name, balance, account_id } = request.body;

  const result = await createService.execute({
    name,
    balance,
    user_id,
    account_id,
  });

  return response.json(result);
}
