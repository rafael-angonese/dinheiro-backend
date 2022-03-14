import AppError from "../AppError";

export class RefreshTokenNotFoundError extends AppError {
    constructor() {
        super('Refresh Token not found', 'REFRESH_TOKEN_NOT_FOUND', 404);
    }
}