import AppError from "../AppError";

export class AccountNotFoundError extends AppError {
    constructor() {
        super('Account not found', 'ACCOUNT_NOT_FOUND', 404);
    }
}