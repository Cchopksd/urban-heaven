const { databaseConfig } = require('./connectDB');

exports.createTableIfNotExists = async (tableName, tableQuery) => {
	try {
		const checkTable = `SELECT to_regclass('${tableName}')`;
		const result = await databaseConfig.query(checkTable);

		if (!result.rows[0].to_regclass) {
			await databaseConfig.query(tableQuery);
			console.log(`${tableName} table created successfully`);
		}
		// else {
		//     console.log(`${tableName} table already exists`);
		// }
	} catch (err) {
		console.error(`Error creating ${tableName} table:`, err);
	}
};

const userTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        uuid UUID DEFAULT uuid_generate_v4(),
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(10) NOT NULL,
        gender VARCHAR(255) NOT NULL,
        date INTEGER NOT NULL,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL
    );
`;

const sessionTableQuery = `
    CREATE TABLE session(
        sid varchar NOT NULL,
        sess json NOT NULL,
        expire timestamp with time zone NOT NULL,
        PRIMARY KEY(sid)
    );
`;

const addressTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE address (
        address_ID UUID DEFAULT uuid_generate_v4(),
        user_ID UUID REFERENCES users(ID),
        province VARCHAR(255) NOT NULL,
        county VARCHAR(255) NOT NULL,
        district VARCHAR(255) NOT NULL,
        post_ID VARCHAR(255) NOT NULL,
        address_etc VARCHAR(255) NOT NULL,
        address_default BOOLEAN NOT NULL DEFAULT false,
        address_label VARCHAR(255) NOT NULL,
        PRIMARY KEY(address_ID)
    );
`;

const merchantTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE merchant (
        merchant_ID UUID DEFAULT uuid_generate_v4(),
        user_ID UUID REFERENCES users(ID),
        merchant_name VARCHAR(100) NOT NULL,
        merchant_email VARCHAR(100) NOT NULL,
        merchant_phone VARCHAR(100) NOT NULL,
        merchant_address VARCHAR(100) NOT NULL,
        PRIMARY KEY(merchant_ID)
    );
`;

exports.createTables = async () => {
	await this.createTableIfNotExists('users', userTableQuery);
	await this.createTableIfNotExists('session', sessionTableQuery);
	await this.createTableIfNotExists('address', addressTableQuery);
	await this.createTableIfNotExists('merchant', merchantTableQuery);
};
