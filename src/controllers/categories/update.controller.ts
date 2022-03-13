import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/categories/update.service";

const updateService = new UpdateCategoryService();

export class UpdateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { name, type } = request.body

        const result = await updateService.execute(id, { name, type });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result)
    }
}