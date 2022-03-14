import AppError from "../AppError";

export class UserNotFoundError extends AppError {
    constructor() {
        super('User not found', 'USER_NOT_FOUND', 404);
    }
}