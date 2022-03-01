import { Request, Response, NextFunction } from 'express'
import { verify } from '../providers/token'

const authenticated = (request: Request, response: Response, next: NextFunction) => {
    const authorization = request.headers.authorization || ''

    if (!authorization) {
        return response.status(401).json({ error: "Token is missing" });
    }
    const token = authorization.replace('Bearer ', '')

    try {
        verify(token);

        return next();
    } catch (err) {
        return response.status(401).end();
    }
}

export default authenticated