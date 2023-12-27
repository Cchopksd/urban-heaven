const { Pool } = require('pg')

exports.databaseConfig = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'chat_app',
    user: 'postgres',
    password: 'password',
    // connectStringZ:  "postgres://default:4WJijvrZ8UPK@ep-tight-surf-25606081.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb"
})