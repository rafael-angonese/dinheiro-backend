import { InvalidateAllUserRefreshToken } from "./InvalidateAllUserRefreshToken";
import { InvalidateRefreshTokenService } from "./InvalidateRefreshTokenService";

type LogoutRequest = {
    refreshToken: string;
    allDevices: boolean;
};

const invalidateRefreshTokenService = new InvalidateRefreshTokenService()
const invalidateAllUserRefreshToken = new InvalidateAllUserRefreshToken()

export class LogoutService {
    async execute(refreshTokenParams: LogoutRequest): Promise<void> {

        if (refreshTokenParams.allDevices) {
            await invalidateAllUserRefreshToken.execute(refreshTokenParams.refreshToken)
        } else {
            await invalidateRefreshTokenService.execute(refreshTokenParams.refreshToken)
        }
    }
}
