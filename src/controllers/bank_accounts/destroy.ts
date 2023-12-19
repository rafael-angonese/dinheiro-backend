import { Request, Response } from 'express';
import { DeleteBankAccountService } from '../../services/bank_accounts/delete.service';

const deleteService = new DeleteBankAccountService();

export async function destroy(
  request: Request,
  response: Response,
): Promise<Response> {
  const { id } = request.params;
  const { user_id } = request.auth;

  await deleteService.execute(id, user_id);

  return response.status(200).send('');
}
