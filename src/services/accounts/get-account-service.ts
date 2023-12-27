import { AccountNotFoundError } from '@/errors/accounts/AccountNotFoundError';
import { AccountsRepository } from '@/repositories/accounts-repository';
import { Account } from '@prisma/client';

interface GetAccountServiceRequest {
  id: string;
}

interface GetAccountServiceResponse {
  account: Account;
}

export class GetAccountService {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    id,
  }: GetAccountServiceRequest): Promise<GetAccountServiceResponse> {
    const account = await this.accountsRepository.findById(id);

    if (!account) {
      throw new AccountNotFoundError();
    }

    return {
      account: account,
    };
  }
}
