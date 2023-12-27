import { PrismaAccountRepository } from '@/repositories/prisma/prisma-accounts-repository';
import { UpdateAccountService } from '@/services/accounts/update-account-service';
import { updateAccountValidator } from '@/validators/accounts/update-account-validator';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function update(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);
    const { name, description } = updateAccountValidator.parse(request.body);

    const accountsRepository = new PrismaAccountRepository();
    const useCase = new UpdateAccountService(accountsRepository);

    const { account } = await useCase.execute(id, { name, description });

    return response.json({
      data: account,
    });
  } catch (error) {
    next(error);
  }
}
