import { z } from 'zod';

export const presignedUrlValidator = z.object({
  fileExtension: z.string(),
});
