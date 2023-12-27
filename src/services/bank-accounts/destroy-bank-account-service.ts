import { BankAccountNotFoundError } from '@/errors/bank_accounts/BankAccountNotFoundError';
import { BankAccountsRepository } from '@/repositories/bank-accounts-repository';
import { BankAccount } from '@prisma/client';

interface DestroyBankAccountServiceRequest {
  id: string;
}

interface DestroyBankAccountServiceResponse {
  bankAccount: BankAccount | null;
}

export class DestroyBankAccountService {
  constructor(private bankAccountsRepository: BankAccountsRepository) {}

  async execute({
    id,
  }: DestroyBankAccountServiceRequest): Promise<DestroyBankAccountServiceResponse> {
    const bankAccount = await this.bankAccountsRepository.findById(id);

    if (!bankAccount) {
      throw new BankAccountNotFoundError();
    }
    await this.bankAccountsRepository.destroy(id);

    return {
      bankAccount,
    };
  }
}
