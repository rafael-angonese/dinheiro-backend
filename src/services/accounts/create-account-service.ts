import { AccountsRepository } from '@/repositories/accounts-repository';
import { Account } from '@prisma/client';

interface CreateAccountServiceRequest {
  userId: string;
  name: string;
  description: string;
}

interface CreateAccountServiceResponse {
  account: Account;
}

export class CreateAccountService {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    userId,
    description,
    name,
  }: CreateAccountServiceRequest): Promise<CreateAccountServiceResponse> {
    const account = await this.accountsRepository.create({
      userId,
      name,
      description,
    });

    return {
      account,
    };
  }
}
