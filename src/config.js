module.exports = {
    server: {
        port: process.env.PORT || 3000,
    },
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY || 'secretword',
        expiresIn: '1h',
    },
    database: {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'express_auth_task',
        password: process.env.DB_PASSWORD || '',
        port: process.env.DB_PORT || 5432,
    },
};
