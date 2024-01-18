const { databaseConfig } = require('./connectDB');

exports.createTableIfNotExists = async (
	tableName,
	tableQuery,
) => {
	try {
		const checkTable = `SELECT to_regclass('${tableName}')`;
		const result = await databaseConfig.query(
			checkTable,
		);

		if (!result.rows[0].to_regclass) {
			await databaseConfig.query(tableQuery);
			console.log(
				`${tableName} table created successfully`,
			);
		}
		// else {
		//     console.log(`${tableName} table already exists`);
		// }
	} catch (err) {
		console.error(
			`Error creating ${tableName} table:`,
			err,
		);
	}
};

const userTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users (
        user_ID UUID DEFAULT uuid_generate_v4(),
        user_fname VARCHAR(255) NOT NULL,
        user_lname VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        user_password VARCHAR(255) NOT NULL,
        user_phone VARCHAR(10) NOT NULL,
        user_gender VARCHAR(255) NOT NULL,
        user_day INTEGER NOT NULL,
        user_month INTEGER NOT NULL,
        user_year INTEGER NOT NULL,
        PRIMARY KEY(user_ID)
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
        user_ID UUID REFERENCES users(user_ID),
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

exports.createTables = async () => {
	await this.createTableIfNotExists(
		'users',
		userTableQuery,
	);
	await this.createTableIfNotExists(
		'session',
		sessionTableQuery,
	);
	await this.createTableIfNotExists(
		'address',
		addressTableQuery,
	);
};
