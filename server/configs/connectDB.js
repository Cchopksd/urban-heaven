const { Pool } = require('pg')

exports.databaseConfig = new Pool({
    // host: process.env.DB_HOST || 'localhost',
    // port: process.env.DB_PORT || 5432,
    // database: process.env.DB_DATABASE || 'chat_app',
    // user: process.env.DB_USER || 'postgres',
    // password: process.env.DB_PASSWORD || 'password',
    connectionString: process.env.DATABASE_URL,
})