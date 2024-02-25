import { httpStatusCode } from '@/errors/http-status-code';
import { CreatePresignedUrlService } from '@/services/create-presigned-url-service';
import { presignedUrlValidator } from '@/validators/presigned-url-validator';
import { NextFunction, Request, Response } from 'express';

export async function createPresignedUrl(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { objectKey } = presignedUrlValidator.parse(request.query);

    const useCase = new CreatePresignedUrlService();

    const { presignedUrl } = await useCase.execute({ objectKey });

    return response.status(httpStatusCode.created).json({
      data: presignedUrl,
    });
  } catch (error) {
    next(error);
  }
}
