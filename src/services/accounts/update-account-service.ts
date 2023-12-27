import { AccountNotFoundError } from '@/errors/accounts/AccountNotFoundError';
import { AccountsRepository } from '@/repositories/accounts-repository';
import { Account } from '@prisma/client';

interface UpdateAccountServiceRequest {
  name?: string;
  description?: string;
}

interface UpdateAccountServiceResponse {
  account: Account;
}

export class UpdateAccountService {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(
    id: string,
    { name, description }: UpdateAccountServiceRequest,
  ): Promise<UpdateAccountServiceResponse> {
    const user = await this.accountsRepository.findById(id);

    if (!user) {
      throw new AccountNotFoundError();
    }

    const updatedAccount = await this.accountsRepository.update(id, {
      name,
      description,
    });

    return {
      account: updatedAccount,
    };
  }
}
