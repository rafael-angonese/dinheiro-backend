import { User } from '@prisma/client';
import { prismaClient } from '../../database/prismaClient';
import { ShowUserService } from './show-user-service';

const showUserService = new ShowUserService();

type UserRequest = {
  name: string;
  email: string;
  role: string;
};

export class UpdateUserService {
  async execute(id: string, userParams: UserRequest): Promise<User> {
    const data = await showUserService.execute(id);

    const updatedUser = await prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        ...userParams,
      },
    });
    return updatedUser;
  }
}
