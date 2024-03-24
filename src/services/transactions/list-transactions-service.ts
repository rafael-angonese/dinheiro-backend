import { Meta } from '@/@types/meta';
import {
  TransactionsRepository,
} from '@/repositories/transactions-repository';
import { Transaction } from '@prisma/client';

interface ListTransactionsServiceRequest {
  qs?: string;
  page: number;
  perPage: number;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
}

interface ListTransactionsServiceResponse {
  data: Transaction[];
  meta: Meta;
}

export class ListTransactionsService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    qs,
    page,
    perPage,
    userId,
    startDate,
    endDate,
  }: ListTransactionsServiceRequest): Promise<ListTransactionsServiceResponse> {
    const { data, meta }  = await this.transactionsRepository.list({
      qs,
      page,
      perPage,
      userId,
      startDate,
      endDate,
    });

    return {
      data,
      meta
    };
  }
}
