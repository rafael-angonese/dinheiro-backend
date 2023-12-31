import { Prisma, RefreshToken } from '@prisma/client';

export interface RefreshTokensRepository {
  findByToken(token: string): Promise<RefreshToken | null>;
  create(data: Prisma.RefreshTokenUncheckedCreateInput): Promise<RefreshToken>;
  update(
    id: string,
    data: Prisma.RefreshTokenUncheckedUpdateInput,
  ): Promise<RefreshToken>;
  invalidateByUserId(userId: string): Promise<void>;
}
