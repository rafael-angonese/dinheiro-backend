import { AccountNotFoundError } from '@/errors/accounts/AccountNotFoundError';
import { AccountsRepository } from '@/repositories/accounts-repository';
import { Account } from '@prisma/client';

interface DestroyAccountServiceRequest {
  id: string;
}

interface DestroyAccountServiceResponse {
  account: Account | null;
}

export class DestroyAccountService {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    id,
  }: DestroyAccountServiceRequest): Promise<DestroyAccountServiceResponse> {
    const account = await this.accountsRepository.findById(id);

    if (!account) {
      throw new AccountNotFoundError();
    }
    await this.accountsRepository.destroy(id);

    return {
      account,
    };
  }
}
