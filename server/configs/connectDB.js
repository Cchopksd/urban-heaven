const { Pool } = require('pg');

// console.log(process.env.DATABASE_URL)

exports.databaseConfig = new Pool({
	host: process.env.POSTGRES_HOST || 'localhost',
	port: process.env.POSTGRES_PORT || 5432,
	database: process.env.POSTGRES_DATABASE || 'urban-heaven',
	user: process.env.POSTGRES_USER || 'postgres',
	password: process.env.POSTGRES_PASSWORD || 'password',
	// connectionString: process.env.POSTGRES_URL + '?sslmode=require',
});
