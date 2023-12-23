import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { RefreshTokensRepository } from '../refresh-tokens-repository';
export class PrismaRefreshTokensRepository implements RefreshTokensRepository {
  async create(data: Prisma.RefreshTokenUncheckedCreateInput) {
    const refreshToken = await prisma.refreshToken.create({
      data,
    });

    return refreshToken;
  }
}
