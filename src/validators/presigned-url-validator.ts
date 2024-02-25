import { z } from 'zod';

export const presignedUrlValidator = z.object({
  objectKey: z.string(),
});
