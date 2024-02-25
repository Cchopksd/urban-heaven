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

    CREATE TABLE users (
        user_id SERIAL,
        user_uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(10) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        refresh_token VARCHAR(512) NOT NULL,
        role VARCHAR(10) NOT NULL DEFAULT 'member',
        date INTEGER NOT NULL,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL,
        is_checked BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`;

const sessionTableQuery = `
    CREATE TABLE session(
        sid varchar NOT NULL,
        user_uuid UUID REFERENCES users(user_uuid),
        sess json NOT NULL,
        expire TIMESTAMP WITH TIME ZONE NOT NULL,
        PRIMARY KEY(sid)
    )
`;

const addressTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE address (
        address_uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        province VARCHAR(255) NOT NULL,
        county VARCHAR(255) NOT NULL,
        district VARCHAR(255) NOT NULL,
        postal_code VARCHAR(10) NOT NULL,
        address_line_1 VARCHAR(255) NOT NULL,
        address_line_2 VARCHAR(255),
        address_label VARCHAR(255),
        address_default BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
`;

const userAddressesTableQuery = `
    CREATE TABLE user_addresses (
        user_address_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_uuid UUID NOT NULL REFERENCES users(user_uuid),
        address_uuid UUID NOT NULL REFERENCES address(address_uuid)
    );
`;

const agreementTableQuery = `
    CREATE TABLE agreement (
        agreement_id SERIAL PRIMARY KEY,
        user_uuid UUID NOT NULL REFERENCES users(user_uuid),
        is_vendor_agreement BOOLEAN NOT NULL DEFAULT FALSE
    );
`;

const merchantTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE vendor (
        merchant_uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_uuid UUID REFERENCES users(user_uuid),
        vendor_name VARCHAR(100) NOT NULL,
        contact_email VARCHAR(100) NOT NULL,
        contact_phone VARCHAR(10) NOT NULL,
        vendor_address VARCHAR(100) NOT NULL,
        is_active BOOLEAN NOT NULL
    )
`;

exports.createTables = async () => {
	await this.createTableIfNotExists('users', userTableQuery);
	await this.createTableIfNotExists('session', sessionTableQuery);
	await this.createTableIfNotExists(
		'user_addresses',
		userAddressesTableQuery,
	);
	await this.createTableIfNotExists('address', addressTableQuery);
	await this.createTableIfNotExists('vendor', merchantTableQuery);
	await this.createTableIfNotExists('agreement', agreementTableQuery);
};