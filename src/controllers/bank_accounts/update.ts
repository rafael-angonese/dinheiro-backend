import { Request, Response } from 'express';
import { UpdateBankAccountService } from '../../services/bank_accounts/update.service';

const updateService = new UpdateBankAccountService();
export async function update(
  request: Request,
  response: Response,
): Promise<Response> {
  const { id } = request.params;
  const { user_id } = request.auth;
  const { name, balance } = request.body;

  const result = await updateService.execute(id, user_id, { name, balance });

  return response.json(result);
}
