import { File } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

interface IRequest {
  key: string;
  model: string;
  name: string;
  bucket: string;
  url: string;
  size: number;
  contentType: string;
  originalName: string;
}

export class CreateFileService {
  async execute(params: IRequest): Promise<File> {
    const data = await prismaClient.file.create({
      data: {
        ...params,
      },
    });

    return data;
  }
}
