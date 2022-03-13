import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/categories/delete.service";

const deleteService = new DeleteCategoryService();

export class DeleteCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params

        const result = await deleteService.execute(id)

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(200).send("")
    }
}