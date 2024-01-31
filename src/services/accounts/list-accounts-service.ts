import { Meta } from '@/@types/meta';
import { AccountsRepository } from '@/repositories/accounts-repository';
import { Account } from '@prisma/client';

interface ListAccountsServiceRequest {
  qs?: string;
  page: number;
  perPage: number;
  userId: string;
}

interface ListAccountsServiceResponse {
  data: Account[];
  meta: Meta
}

export class ListAccountsService {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    qs,
    page,
    perPage,
    userId,
  }: ListAccountsServiceRequest): Promise<ListAccountsServiceResponse> {
    const { data, meta } = await this.accountsRepository.list({
      qs,
      page,
      perPage,
      userId,
    });

    return {
      data,
      meta
    };
  }
}
