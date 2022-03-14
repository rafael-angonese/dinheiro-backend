import AppError from "../AppError";

export class BankAccountNotFoundError extends AppError {
    constructor() {
        super('Bank Account not found', 'BANK_ACCOUNT_NOT_FOUND', 404);
    }
}