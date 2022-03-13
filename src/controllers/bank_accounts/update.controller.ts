import { Request, Response } from "express";
import { UpdateBankAccountService } from "../../services/bank_accounts/update.service";

const updateService = new UpdateBankAccountService();
export class UpdateBankAccountController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { user_id } = request.auth
        const { name, balance } = request.body

        const result = await updateService.execute(id, user_id, { name, balance });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result)
    }
}