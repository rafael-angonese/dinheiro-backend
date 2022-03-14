import AppError from "../AppError";

export class TransactionNotFoundError extends AppError {
    constructor() {
        super('Transaction not found', 'TRANSACTION_NOT_FOUND', 404);
    }
}