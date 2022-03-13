import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/categories/create.service";

const createService = new CreateCategoryService();
export class CreateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.auth
        const { name, type } = request.body

        const result = await createService.execute({ name, type });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result)
    }
}