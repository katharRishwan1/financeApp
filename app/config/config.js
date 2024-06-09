const envConfigs = {
    port: process.env.PORT,
    enviroment: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
    redis_options: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    },
    smsApiKey: process.env.SMS_API_KEY,
    senderId: process.env.SENDER_ID,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    roleNames: {
        ad: 'ADMIN',
        us: 'USER',
    },
    awsBucketName: process.env.AWS_BUCKET_NAME,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_KEY,
    awsRegion: process.env.AWS_BUCKET_REGION,
};
console.log('datadase key----', process.env.MONGODB_DEV_URI);
module.exports = { ...envConfigs }