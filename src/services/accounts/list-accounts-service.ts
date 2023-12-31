import { AccountsRepository } from '@/repositories/accounts-repository';
import { Account } from '@prisma/client';

interface ListAccountsServiceRequest {
  query?: string;
  page: number;
  userId: string;
}

interface ListAccountsServiceResponse {
  accounts: Account[];
}

export class ListAccountsService {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    page,
    query = '',
    userId,
  }: ListAccountsServiceRequest): Promise<ListAccountsServiceResponse> {
    const accounts = await this.accountsRepository.list(query, page, userId);

    return {
      accounts: accounts,
    };
  }
}
