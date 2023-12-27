import { BankAccountsRepository } from '@/repositories/bank-accounts-repository';
import { BankAccount } from '@prisma/client';

interface ListBankAccountsServiceRequest {
  query?: string;
  page: number;
  userId: string;
  accountId: string;
}

interface ListBankAccountsServiceResponse {
  bankAccounts: BankAccount[];
}

export class ListBankAccountsService {
  constructor(private bankAccountsRepository: BankAccountsRepository) {}

  async execute({
    page,
    query = '',
    userId,
    accountId,
  }: ListBankAccountsServiceRequest): Promise<ListBankAccountsServiceResponse> {
    const bankAccounts = await this.bankAccountsRepository.list(
      query,
      page,
      userId,
      accountId,
    );

    return {
      bankAccounts,
    };
  }
}
