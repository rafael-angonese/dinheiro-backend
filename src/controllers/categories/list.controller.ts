import { Request, Response } from "express";
import { ListCategoryService } from "../../services/categories/list.service";

const listService = new ListCategoryService();

interface IListParams extends Request {
    query: {
        type: string
    }
}

export class ListCategoryController {
    async handle(request: IListParams, response: Response): Promise<Response> {

        const { type } = request.query

        const result = await listService.execute({ type })

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result)
    }
}