import AppError from "../AppError";

export class InvalidCredentialsError extends AppError {
    constructor() {
        super('Incorrect email or password', 'INCORRECT_EMAIL_OR_PASSWORD', 401);
    }
}