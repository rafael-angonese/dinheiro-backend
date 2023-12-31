import { BankAccountNotFoundError } from '@/errors/bank_accounts/BankAccountNotFoundError';
import { BankAccountsRepository } from '@/repositories/bank-accounts-repository';
import { BankAccount } from '@prisma/client';

interface UpdateBankAccountServiceRequest {
  name?: string;
  balance?: number;
}

interface UpdateBankAccountServiceResponse {
  bankAccount: BankAccount;
}

export class UpdateBankAccountService {
  constructor(private bankAccountsRepository: BankAccountsRepository) {}

  async execute(
    id: string,
    { name, balance }: UpdateBankAccountServiceRequest,
  ): Promise<UpdateBankAccountServiceResponse> {
    const user = await this.bankAccountsRepository.findById(id);

    if (!user) {
      throw new BankAccountNotFoundError();
    }

    const updatedAccount = await this.bankAccountsRepository.update(id, {
      name,
      balance,
    });

    return {
      bankAccount: updatedAccount,
    };
  }
}
