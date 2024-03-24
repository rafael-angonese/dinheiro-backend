import { Meta } from '@/@types/meta';
import { BankAccountsRepository } from '@/repositories/bank-accounts-repository';
import { BankAccount } from '@prisma/client';

interface ListBankAccountsServiceRequest {
  qs?: string;
  page: number;
  perPage: number;
}

interface ListBankAccountsServiceResponse {
  data: BankAccount[];
  meta: Meta

}

export class ListBankAccountsService {
  constructor(private bankAccountsRepository: BankAccountsRepository) { }

  async execute({
    qs,
    page,
    perPage,
  }: ListBankAccountsServiceRequest): Promise<ListBankAccountsServiceResponse> {
    const { data, meta } = await this.bankAccountsRepository.list(
      {
        qs,
        page,
        perPage,
      }
    );

    return {
      data,
      meta
    };
  }
}
