import { BankAccountsRepository } from '@/repositories/bank-accounts-repository';
import { BankAccount } from '@prisma/client';

interface CreateBankAccountServiceRequest {
  name: string;
  balance: number;
  userId: string;
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
  }: CreateBankAccountServiceRequest): Promise<CreateBankAccountServiceResponse> {
    const bankAccount = await this.bankAccountsRepository.create({
      name,
      balance,
      userId
    });

    return {
      bankAccount,
    };
  }
}
