import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { name, email, password, role } = request.body

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                role,
                password
            }
        })

        return response.json(user)
    }
}