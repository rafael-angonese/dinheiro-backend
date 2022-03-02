const oneSecond = 1000;
const oneMinute = 60;
const oneHour = 60;
const oneDay = 24;
const oneWeek = 7;

export default {
    jwt: {
        publicKey: process.env.JWT_PUBLIC_KEY || "",
        privateKey: process.env.JWT_PRIVATE_KEY || "",
        expiresIn: '1d'
    },
    refreshToken: {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET || "",
        duration: oneSecond * oneMinute * oneHour * oneDay * oneWeek
    }
}