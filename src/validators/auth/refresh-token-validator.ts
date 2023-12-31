import { z } from 'zod';

export const refreshTokenValidator = z.object({
  refreshToken: z.string(),
});
