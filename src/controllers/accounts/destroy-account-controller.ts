import { PrismaAccountRepository } from '@/repositories/prisma/prisma-accounts-repository';
import { DestroyAccountService } from '@/services/accounts/destroy-account-service';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function destroy(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);

    const usersRepository = new PrismaAccountRepository();
    const useCase = new DestroyAccountService(usersRepository);

    await useCase.execute({
      id,
    });

    return response.status(200).send();
  } catch (error) {
    next(error);
  }
}
