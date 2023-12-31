import { BankAccountNotFoundError } from '@/errors/bank_accounts/BankAccountNotFoundError';
import { BankAccountsRepository } from '@/repositories/bank-accounts-repository';
import { BankAccount } from '@prisma/client';

interface GetBankAccountServiceRequest {
  id: string;
}

interface GetBankAccountServiceResponse {
  bankAccount: BankAccount;
}

export class GetBankAccountService {
  constructor(private bankAccountsRepository: BankAccountsRepository) {}

  async execute({
    id,
  }: GetBankAccountServiceRequest): Promise<GetBankAccountServiceResponse> {
    const bankAccount = await this.bankAccountsRepository.findById(id);

    if (!bankAccount) {
      throw new BankAccountNotFoundError();
    }

    return {
      bankAccount,
    };
  }
}
