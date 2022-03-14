import AppError from "../AppError";

export class CategoryNotFoundError extends AppError {
    constructor() {
        super('Category not found', 'CATEGORY_NOT_FOUND', 404);
    }
}