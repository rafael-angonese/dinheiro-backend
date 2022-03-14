import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/categories/create.service";

const createService = new CreateCategoryService();
export class CreateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { name, type } = request.body

        const result = await createService.execute({ name, type });

        return response.json(result)
    }
}