export const Config = {
    PORT: process.env.PORT || 8070,
    secretKey: process.env.SECRET_KEY || 'MY382SecretKeyForSessionManagement!1mplemeteOF23453dYTojh3r',
    sessionMaxAge: 1000 * 60 * 60,
    sessionExpiration: process.env.SESSION_EXPIRATION || 3600, // 1 hour in seconds
    cookieHttpOnly: true,
    cookieSameSite: 'strict',
    JWT_SECRET: process.env.JWT_SECRET || 'JSonconfident#%bch%Admins1290_deep_99QW23-PRTD-23fbg0993fo073acthldx2789gxo3hud01k',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // 1 hour
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'RefreshTokenSecretKeyForJWT!1mplemeteOF23453dYTojh3r',
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || '7d', // 7 days
    SALT_ARAOUND: Number(process.env.SALT_ARAOUND) || 10,

    clientCode: { 
        prefix: process.env.CLIENT_CODE_PREFIX || 'OPR',
        padding: Number(process.env.CLIENT_CODE_PADDING) || 5
    }
} 

export default Config;