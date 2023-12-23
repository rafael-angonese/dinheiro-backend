import { User } from '@prisma/client';

export const excludeUserPasswordField = (
  user: User,
): Omit<User, 'password'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};
