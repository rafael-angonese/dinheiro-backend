import { InvalidateAllUserRefreshToken } from "./InvalidateAllUserRefreshToken";
import { InvalidateRefreshTokenService } from "./InvalidateRefreshTokenService";

type LogoutRequest = {
    refreshToken: string;
    allDevices: boolean;
};

const invalidateRefreshTokenService = new InvalidateRefreshTokenService()
const invalidateAllUserRefreshToken = new InvalidateAllUserRefreshToken()

export class LogoutService {
    async execute(refreshTokenParams: LogoutRequest): Promise<Error | void> {
        let result = null
        if (refreshTokenParams.allDevices) {
            result = await invalidateAllUserRefreshToken.execute(refreshTokenParams.refreshToken)
        } else {
            result = await invalidateRefreshTokenService.execute(refreshTokenParams.refreshToken)
        }

        if (result instanceof Error) {
            return new Error("Failed to logout");
        }
    }
}
