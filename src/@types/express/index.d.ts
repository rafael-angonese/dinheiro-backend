import { IDecodedJwt } from "../jwt/token";

declare global {
    namespace Express {
        export interface Request {
            auth: IDecodedJwt;
        }
    }
}
