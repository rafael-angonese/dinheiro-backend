import AppError from "../AppError";

export class JWTInvalidTokenError extends AppError {
    constructor() {
        super('JWT invalid token', 'JWT_INVALID', 401);
    }
}