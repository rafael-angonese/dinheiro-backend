import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { RefreshTokensRepository } from '../refresh-tokens-repository';
export class PrismaRefreshTokensRepository implements RefreshTokensRepository {
  async findByToken(token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        token: token,
      },
    });

    return refreshToken;
  }
  async create(data: Prisma.RefreshTokenUncheckedCreateInput) {
    const refreshToken = await prisma.refreshToken.create({
      data,
    });

    return refreshToken;
  }
  async update(id: string, data: Prisma.RefreshTokenUncheckedUpdateInput) {
    const refreshToken = await prisma.refreshToken.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return refreshToken;
  }
  async invalidateByUserId(userId: string) {
    await prisma.refreshToken.updateMany({
      where: {
        userId: userId,
      },
      data: {
        valid: false,
      },
    });
  }
}
