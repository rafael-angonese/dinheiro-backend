import AppError from "../AppError";

export class UserNotFound extends AppError {
    constructor() {
        super('User not found', 'USER_NOT_FOUND', 404);
    }
}