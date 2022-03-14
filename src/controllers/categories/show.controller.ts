import { Request, Response } from "express";
import { ShowCategoryService } from "../../services/categories/show.service";

const showService = new ShowCategoryService();

export class ShowCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params

        const result = await showService.execute({ id })

        return response.json(result)
    }
}