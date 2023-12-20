const { Pool } = require('pg')

exports.databaseConfig = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'chat_app',
    user: 'postgres',
    password: 'password',
    timezone: 'Asia/Bangkok',
    // connectString
})