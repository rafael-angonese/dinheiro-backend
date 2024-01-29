import { BankAccountsRepository } from '@/repositories/bank-accounts-repository';
import { BankAccount } from '@prisma/client';

interface CreateBankAccountServiceRequest {
  name: string;
  balance: number;
  userId: string;
  accountId: string;
}

interface CreateBankAccountServiceResponse {
  bankAccount: BankAccount;
}

export class CreateBankAccountService {
  constructor(private bankAccountsRepository: BankAccountsRepository) {}

  async execute({
    name,
    balance,
    userId,
    accountId,
  }: CreateBankAccountServiceRequest): Promise<CreateBankAccountServiceResponse> {
    const bankAccount = await this.bankAccountsRepository.create({
      name,
      balance,
      userId,
      accountId,
    });

    return {
      bankAccount,
    };
  }
}
